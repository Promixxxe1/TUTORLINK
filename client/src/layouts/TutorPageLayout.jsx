import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import RefreshButton from "../components/RefreshButton";

import { useAuth } from "../context/AuthContext";
import { useNotificationBell } from "../hooks/useNotificationBell";
import { bookingAPI } from "../services/api";
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
  const [studentCount, setStudentCount] = useState(0);
  const [avgRating, setAvgRating] = useState("0.0");
  const [isCompact, setIsCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 24) {
        setIsCompact(true);
      } else if (currentY < lastScrollY) {
        setIsCompact(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchTutorStats = async () => {
      if (!user) return;

      try {
        const res = await bookingAPI.getMyBookings();
        const tutorBookings = (res.data?.bookings || []).filter((booking) => {
          const tutorId = booking.tutor?._id || booking.tutor;
          const userId = user?.id || user?._id;
          return tutorId && userId && tutorId.toString() === userId.toString();
        });

        const uniqueStudents = new Set(
          tutorBookings
            .map((booking) => booking.student?._id || booking.student)
            .filter(Boolean)
            .map((id) => id.toString()),
        ).size;

        const ratedBookings = tutorBookings.filter(
          (booking) => booking.isReviewed && Number(booking.rating) >= 1,
        );

        const ratingValue =
          ratedBookings.length > 0
            ? (
                ratedBookings.reduce(
                  (sum, booking) => sum + Number(booking.rating || 0),
                  0,
                ) / ratedBookings.length
              ).toFixed(1)
            : "0.0";

        setStudentCount(uniqueStudents);
        setAvgRating(ratingValue);
      } catch (error) {
        console.error("Failed to load tutor stats", error);
      }
    };

    const onManual = async () => {
      window.dispatchEvent(new CustomEvent("manualRefreshStart"));
      await fetchTutorStats();
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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[85vw] max-w-[320px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 sm:w-80 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-7 py-7 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white w-8 h-8" />
              </div>

              <div>
                <h1 className="font-black text-2xl text-slate-900">
                  TutorLink
                </h1>
                <p className="text-sm text-slate-500">Tutor Workspace</p>
              </div>
            </div>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="hidden lg:block">
              <RefreshButton />
            </div>

            <img
              src={avatarUrl}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white/20"
            />

            <div>
              <h2 className="font-bold text-slate-900 text-lg">{user?.name}</h2>
              <p className="text-slate-500 text-sm">Professional Tutor</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/10 rounded-2xl p-3">
              <p className="text-xs text-slate-400 uppercase">Students</p>
              <h3 className="text-slate-900 text-xl font-bold">
                {studentCount}
              </h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-3">
              <p className="text-xs text-slate-400 uppercase">Rating</p>
              <h3 className="text-yellow-400 text-xl font-bold">
                {avgRating}★
              </h3>
            </div>
          </div>
        </div>

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

        <div className="border-t border-slate-200 p-5 pb-8">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-50 py-4 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= Main Content ================= */}

      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* ================= Header ================= */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
                  Welcome back,
                  <span className="text-blue-600"> {user?.name}</span>
                </h1>

                <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                  Manage your students, schedule and earnings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <RefreshButton />
              </div>

              <div className="hidden md:flex items-center w-56 rounded-2xl bg-slate-100 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-3 flex-1 bg-transparent text-sm outline-none"
                />
              </div>

              <NavLink
                to="/tutor/notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </NavLink>

              <img
                src={avatarUrl}
                alt={user?.name}
                className="h-11 w-11 rounded-2xl border-2 border-white object-cover shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* ================= Page ================= */}

        <main className="flex-1 overflow-x-hidden bg-slate-100 p-4 pb-28 sm:p-5 lg:p-8 lg:pb-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= Mobile Navigation ================= */}

      <nav className="fixed bottom-3 left-1/2 z-30 w-[94%] max-w-md -translate-x-1/2 transition-all duration-300 ease-out lg:hidden">
        <div
          className={`rounded-[1.5rem] border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            isCompact ? "h-14" : "h-16"
          }`}
        >
          <div className="grid h-full grid-cols-5">
            {mobileItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 transition ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`rounded-xl p-2 ${isActive ? "bg-blue-100" : ""}`}
                    >
                      {item.icon}
                    </div>

                    <span className="text-[10px] font-semibold sm:text-[11px]">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
