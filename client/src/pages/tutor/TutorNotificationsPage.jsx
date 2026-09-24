import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import NotificationBell from "../../components/NotificationBell";
import { LuBell } from "react-icons/lu";

const typeIcons = {
  booking: "calendar_today",
  message: "mail",
  payment: "payments",
  review: "star",
  system: "info",
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

export default function TutorNotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const esRef = useRef(null);

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
    // SSE handled by NotificationBell; keep polling fallback here

    const id = setInterval(() => {
      fetchNotifications();
    }, 20000);
    return () => {
      clearInterval(id);
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
      // notify global listeners (bell)
      window.dispatchEvent(new CustomEvent("notificationMarkAll"));
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
    if (!n.read) {
      await handleMarkRead(n._id);
      window.dispatchEvent(
        new CustomEvent("notificationRead", { detail: { id: n._id } }),
      );
    }

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
        <NotificationBell role="tutor" />
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
              className="bg-white rounded-2xl h-20 animate-pulse border border-outline-variant/10"
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className=" p-16 text-center">
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
                  <span className="material-symbols-outlined text-[14px] text-error bg-slate-900 text-white p-5 rounded-full">
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
