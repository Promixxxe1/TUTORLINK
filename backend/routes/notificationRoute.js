import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import {
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
  streamNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markAsRead);
router.put("/mark-all-read", protect, markAllRead);
router.delete("/:id", protect, deleteNotification);

// SSE stream (token may be provided as query param)
router.get("/stream", streamNotifications);

export default router;
