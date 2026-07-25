import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  BarChart3,
  MessageSquare,
  UserCircle,
  Star,
  Settings,
  Bell,
  Search,
  LogOut,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNotificationBell } from "../hooks/useNotificationBell";
import { getAvatarUrl } from "../types";

const navItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    to: "/tutor/dashboard",
  },
  {
    icon: <CalendarDays size={20} />,
    label: "Schedule",
    to: "/tutor/schedule",
  },
  {
    icon: <Users size={20} />,
    label: "Students",
    to: "/tutor/students",
  },
  {
    icon: <Wallet size={20} />,
    label: "Earnings",
    to: "/tutor/earnings",
  },

  {
    icon: <BarChart3 size={20} />,
    label: "Analytics",
    to: "/tutor/analytics",
  },
  {
    icon: <MessageSquare size={20} />,
    label: "Messages",
    to: "/tutor/messages",
  },
  {
    icon: <UserCircle size={20} />,
    label: "Profile",
    to: "/tutor/profile",
  },
  {
    icon: <Star size={20} />,
    label: "Ratings",
    to: "/tutor/ratings",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    to: "/tutor/settings",
  },
];

const mobileItems = [
  {
    icon: <LayoutDashboard size={22} />,
    label: "Home",
    to: "/tutor/dashboard",
  },
  {
    icon: <CalendarDays size={22} />,
    label: "Schedule",
    to: "/tutor/schedule",
  },
  {
    icon: <Users size={22} />,
    label: "Students",
    to: "/tutor/students",
  },
  {
    icon: <Wallet size={22} />,
    label: "Wallet",
    to: "/tutor/earnings",
  },
  {
    icon: <UserCircle size={22} />,
    label: "Profile",
    to: "/tutor/profile",
  },
];

export default function TutorLayout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const unreadCount = useNotificationBell();

  const avatarUrl = getAvatarUrl(user);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ================= Sidebar ================= */}

      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}

        <div className="px-7 py-7 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white w-8 h-8" />
            </div>

            <div>
              <h1 className="font-black text-2xl text-slate-900">TutorLink</h1>

              <p className="text-sm text-slate-500">Tutor Workspace</p>
            </div>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* User Card */}

        <div className="p-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl}
                alt={user?.name}
                className="w-16 h-16 rounded-2xl object-cover border-4 border-white/20"
              />

              <div>
                <h2 className="font-bold text-white text-lg">{user?.name}</h2>

                <p className="text-blue-300 text-sm">Professional Tutor</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white/10 rounded-2xl p-3">
                <p className="text-xs text-slate-400 uppercase">Students</p>

                <h3 className="text-white text-xl font-bold">24</h3>
              </div>

              <div className="bg-white/10 rounded-2xl p-3">
                <p className="text-xs text-slate-400 uppercase">Rating</p>

                <h3 className="text-yellow-400 text-xl font-bold">4.9★</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <div className="flex items-center gap-4">
                {item.icon}

                <span className="font-semibold">{item.label}</span>
              </div>

              <ChevronRight size={18} />
            </NavLink>
          ))}
        </div>

        {/* Logout */}

        <div className="p-5 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full rounded-2xl py-4 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center justify-center gap-3 font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= Main Content ================= */}

      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* ================= Header ================= */}

        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200">
          <div className="flex items-center justify-between px-5 lg:px-8 py-4">
            {/* Left */}

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center"
              >
                <Menu size={22} />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back,
                  <span className="text-blue-600"> {user?.name}</span>
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage your students, schedule and earnings.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="flex items-center gap-4">
              {/* Search */}

              <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-4 py-3 w-80">
                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none ml-3 flex-1 text-sm"
                />
              </div>

              {/* Notification */}

              <NavLink
                to="/tutor/notifications"
                className="relative w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
              >
                <Bell size={20} />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </NavLink>

              {/* Avatar */}

              <img
                src={avatarUrl}
                alt={user?.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* ================= Page ================= */}

        <main className="flex-1 p-5 lg:p-8 pb-28 lg:pb-8 bg-slate-100 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* ================= Mobile Navigation ================= */}

      <nav className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 flex justify-around py-3 z-50">
        {mobileItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition ${
                isActive ? "text-blue-600" : "text-slate-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-xl ${isActive ? "bg-blue-100" : ""}`}
                >
                  {item.icon}
                </div>

                <span className="text-[11px] font-semibold">{item.label}</span>
              </>
            )}
            ;<span className="text-[11px] font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
