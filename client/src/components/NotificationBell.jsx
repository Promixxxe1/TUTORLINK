import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import api from "../services/api";

export default function NotificationBell({ role = "student" }) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications");
        if (!mounted) return;
        setUnread(res.data.unreadCount || 0);
      } catch (e) {}
    };

    fetchUnread();

    const token = localStorage.getItem("authToken");
    if (!token)
      return () => {
        mounted = false;
      };

    try {
      const protocol = location.protocol === "https:" ? "https" : "http";
     const host = "tutorlink-y59j.onrender.com";
      const url = `${protocol}://${host}/api/notifications/stream?token=${token}`;
      const es = new EventSource(url);

      es.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          const payload = msg.payload || msg;
          setUnread((c) => c + 1);
          // broadcast notification to any listening components so they can refresh
          try {
            window.dispatchEvent(
              new CustomEvent("notificationReceived", { detail: payload }),
            );
          } catch (e) {}
        } catch (e) {}
      };

      es.onerror = () => {
        try {
          es.close();
        } catch (e) {}
      };

      const onRead = (e) => {
        const { id } = e.detail || {};
        setUnread((c) => Math.max(0, c - 1));
      };

      const onMarkAll = () => setUnread(0);

      window.addEventListener("notificationRead", onRead);
      window.addEventListener("notificationMarkAll", onMarkAll);

      return () => {
        mounted = false;
        try {
          es.close();
        } catch (e) {}
        window.removeEventListener("notificationRead", onRead);
        window.removeEventListener("notificationMarkAll", onMarkAll);
      };
    } catch (e) {
      return () => {
        mounted = false;
      };
    }
  }, [role]);

  const link =
    role === "tutor" ? "/tutor/notifications" : "/student/notifications";

  return (
    <Link to={link} className="relative inline-flex items-center">
      <Bell className="text-gray-700" />
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unread}
        </span>
      )}
    </Link>
  );
}
