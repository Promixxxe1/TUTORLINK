import Notification from "../models/notificationModel.js";
import jwt from "jsonwebtoken";

// In-memory store of SSE connections: userId -> Set of res
const streams = new Map();

export const streamNotifications = (req, res) => {
  // Support token in query for EventSource
  const token = req.query.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).end();

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch (err) {
    return res.status(401).end();
  }

  const userId = payload.id;

  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  res.write("\n");

  const set = streams.get(userId) || new Set();
  set.add(res);
  streams.set(userId, set);

  req.on("close", () => {
    const s = streams.get(userId);
    if (s) {
      s.delete(res);
      if (s.size === 0) streams.delete(userId);
    }
  });
};

export const sendNotificationToUser = async (userId, payload) => {
  try {
    // persist
    const n = await Notification.create({ user: userId, ...payload });

    // emit to SSE clients (normalize key to string)
    const key = userId?.toString ? userId.toString() : userId;
    const set = streams.get(key);
    if (set) {
      const data = JSON.stringify({ type: "notification", payload: n });
      for (const res of set) {
        try {
          res.write(`data: ${data}\n\n`);
        } catch (e) {
          // ignore broken connection
        }
      }
    }
    return n;
  } catch (err) {
    console.error("sendNotificationToUser error", err);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const unreadOnly =
      req.query.unreadOnly === "true" || req.query.unreadOnly === "1";
    const limit = Number(req.query.limit) || 50;
    const query = { user: req.user._id };
    if (unreadOnly) query.read = false;

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      read: false,
    });

    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const id = req.params.id;
    const n = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { read: true },
      { returnDocument: "after" },
    );
    if (!n) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Marked read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true },
    );
    res.json({ message: "All marked read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    await Notification.deleteOne({ _id: id, user: req.user._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
