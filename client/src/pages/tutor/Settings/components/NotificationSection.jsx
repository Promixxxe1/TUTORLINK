import { useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "react-toastify";

import { userAPI } from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";

export default function NotificationSection() {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState(
    user?.notifications || {
      email: true,
      messages: true,
      bookings: true,
      payments: true,
      marketing: false,
    },
  );

  const handleToggle = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await userAPI.updateNotifications(notifications);

      const updatedUser = {
        ...user,
        notifications: response.data?.notifications || notifications,
      };

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Notification settings updated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update notification settings.",
      );
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ title, description, value, onChange }) => {
    return (
      <div className="flex items-center justify-between gap-6 py-5 border-b border-slate-200 last:border-none">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>

          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>

        <button
          type="button"
          onClick={onChange}
          className={`relative flex-shrink-0 w-14 h-8 rounded-full transition-all duration-300 ${
            value ? "bg-blue-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${
              value ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-blue-600" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Notification Settings
          </h2>

          <p className="text-slate-500">
            Choose how you would like to receive notifications.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <Toggle
          title="Email Notifications"
          description="Receive important updates by email."
          value={notifications.email}
          onChange={() => handleToggle("email")}
        />

        <Toggle
          title="Messages"
          description="Notify me when you receive a new message."
          value={notifications.messages}
          onChange={() => handleToggle("messages")}
        />

        <Toggle
          title="Booking Reminders"
          description="Receive reminders for upcoming lessons."
          value={notifications.bookings}
          onChange={() => handleToggle("bookings")}
        />

        <Toggle
          title="Payment Updates"
          description="Receive payment confirmations and invoices."
          value={notifications.payments}
          onChange={() => handleToggle("payments")}
        />

        <Toggle
          title="Marketing Emails"
          description="Receive promotional emails and platform news."
          value={notifications.marketing}
          onChange={() => handleToggle("marketing")}
        />
      </div>

      {/* Save */}
      <div className="flex justify-end mt-10">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
