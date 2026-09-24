import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import NotificationBell from "../../components/NotificationBell";
import { LuBell, LuCalendar, LuInfo } from "react-icons/lu";

const typeIcons = {
  booking: <LuCalendar/>,
  message: <LuInfo/> ,
  payment: "payments",
  review: "star",
  system: <LuInfo/>,
  withdrawal: "account_balance_wallet",
  application: "person_add",
};
const typeColors = {
  booking: "bg-secondary-container text-on-secondary-container",
  message: "bg-primary-container text-white",
  payment: "bg-tertiary-fixed text-on-tertiary-fixed",
  review: "bg-tertiary-fixed-dim/60 text-on-tertiary-fixed",
  system: "bg-surface-container-high text-on-surface-variant",
  withdrawal: "bg-secondary-container text-on-secondary-container",
  application: "bg-primary-container text-white",
};

export default function StudentNotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);

  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/notifications", {
        params: { unreadOnly: tab === "unread", limit: 50 },
      });
      const data = res.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Try to open an EventSource (SSE) for real-time updates. If it fails, polling (below) will keep data fresh.
    const token = localStorage.getItem("authToken");
    try {
      const protocol = location.protocol === "https:" ? "https" : "http";
      const host = "localhost:4000";
      const url = `${protocol}://${host}/api/notifications/stream${token ? `?token=${token}` : ""}`;
      const es = new EventSource(url);
      wsRef.current = es;

      es.onopen = () => {
        console.log("Student notifications SSE connected");
      };

      es.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          if (msg?.type === "notification" || msg?.type === undefined) {
            // controller sends notification objects directly
            const payload = msg.payload || msg;
            setNotifications((prev) => [payload, ...prev]);
            setUnreadCount((c) => c + 1);
          }
        } catch (e) {
          console.error("Invalid SSE message", e);
        }
      };

      es.onerror = (e) => {
        console.warn("SSE error", e);
        try {
          es.close();
        } catch (e) {}
        wsRef.current = null;
      };
    } catch (e) {
      console.warn("SSE setup failed", e);
      wsRef.current = null;
    }

    // Poll as a fallback every 20s
    const id = setInterval(() => {
      if (!wsRef.current) fetchNotifications();
    }, 20000);

    return () => {
      clearInterval(id);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [user, tab]);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/notifications/mark-all-read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const handleClick = async (n) => {
    // mark read first
    if (!n.read) {
      await handleMarkRead(n._id);
      // emit global event so bell can update
      window.dispatchEvent(
        new CustomEvent("notificationRead", { detail: { id: n._id } }),
      );
    }

    // open modal to show details (instead of immediate navigation)
    setActiveNotification(n);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveNotification(null);
  };

  return (
    <div className="max-w-3xl space-y-6 pb-8">
      <div className="flex justify-end">
        <NotificationBell role="student" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
            Notifications
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            {unreadCount} unread
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm font-semibold text-secondary hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl w-fit">
        {["all", "unread"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${tab === t ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-primary"}`}
          >
            {t === "unread" ? `Unread (${unreadCount})` : "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-20 animate-pulse"
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-outline block mb-4 justify-center items-center flex">
            <LuBell/>
          </span>
          <h3 className="text-xl font-bold text-primary mb-2">
            All caught up!
          </h3>
          <p className="text-on-surface-variant text-sm">
            No {tab === "unread" ? "unread " : ""}notifications.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleClick(n)}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm cursor-pointer group ${!n.read ? "bg-white border-secondary/20 shadow-sm" : "bg-surface-container-low/50 border-outline-variant/10"}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || typeColors.system}`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {typeIcons[n.type] || "info"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-sm ${!n.read ? "font-bold text-primary" : "font-normal text-on-surface-variant"}`}
                  >
                    {n.title}
                  </p>
                  <span className="text-[10px] text-on-surface-variant flex-shrink-0">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  {n.body}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!n.read && (
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                )}
                <button
                  onClick={(e) => handleDelete(n._id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-error-container rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[14px] text-error">
                    close
                  </span>
                </button>
              </div>
            </div>
          ))}

          {/* Notification modal */}
          {modalOpen && activeNotification && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">
                      {activeNotification.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      {new Date(activeNotification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button onClick={closeModal} className="text-gray-500">
                    Close
                  </button>
                </div>

                <div className="mt-4 text-sm text-on-surface-variant">
                  {activeNotification.body}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
