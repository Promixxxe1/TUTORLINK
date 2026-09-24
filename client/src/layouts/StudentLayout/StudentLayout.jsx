import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNotificationBell } from "../../hooks/useNotificationBell";
import { bookingAPI } from "../../services/api";
import { getAvatarUrl } from "../../types";

import StudentSideBar from "./components/StudentSideBar";
import StudentHeader from "./components/StudentHeader";
import StudentMobileNav from "./components/StudentMobileNav";

export default function StudentLayout() {
  const { user, logout } = useAuth();
  console.log("StudentLayout User:", user);

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const unreadCount = useNotificationBell();

  const avatarUrl = getAvatarUrl(user);

  useEffect(() => {
    const fetchStudentStats = async () => {
      if (!user) return;

      try {
        const res = await bookingAPI.getMyBookings();
        const bookings = res.data?.bookings || [];
        setSessionCount(bookings.length);
      } catch (error) {
        console.error("Failed to load student session stats", error);
      }
    };

    const onManual = async () => {
      window.dispatchEvent(new CustomEvent("manualRefreshStart"));
      await fetchStudentStats();
      window.dispatchEvent(new CustomEvent("manualRefreshEnd"));
    };

    window.addEventListener("manualRefresh", onManual);
    window.addEventListener("notificationReceived", onManual);

    return () => {
      window.removeEventListener("manualRefresh", onManual);
      window.removeEventListener("notificationReceived", onManual);
    };
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      <StudentSideBar
        user={user}
        avatarUrl={avatarUrl}
        logout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sessionCount={sessionCount}
      />

      {/* Main Section */}

      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* Header */}

        <StudentHeader
          user={user}
          avatarUrl={avatarUrl}
          unreadCount={unreadCount}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}

        <main className="flex-1 p-5 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}

      <StudentMobileNav />
    </div>
  );
}
