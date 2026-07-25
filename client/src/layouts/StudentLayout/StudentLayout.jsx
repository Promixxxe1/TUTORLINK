import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNotificationBell } from "../../hooks/useNotificationBell";
import { getAvatarUrl } from "../../types";

import StudentSideBar from "./components/StudentSideBar";
import StudentHeader from "./components/StudentHeader";
import StudentMobileNav from "./components/StudentMobileNav";

export default function StudentLayout() {
  const { user, logout } = useAuth();
  console.log("StudentLayout User:", user);

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = useNotificationBell();

  const avatarUrl = getAvatarUrl(user);

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
