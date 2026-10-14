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
    <div className="min-h-screen flex bg-gray-100">
      <StudentSideBar
        user={user}
        avatarUrl={avatarUrl}
        logout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sessionCount={sessionCount}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-80">
        <StudentHeader
          user={user}
          avatarUrl={avatarUrl}
          unreadCount={unreadCount}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-x-hidden p-4 pb-24 sm:p-5 lg:p-8 lg:pb-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <StudentMobileNav />
    </div>
  );
}
