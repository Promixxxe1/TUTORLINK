import { NavLink } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";

export default function StudentHeader({
  user,
  avatarUrl,
  unreadCount,
  setSidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        {/* Left Side */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 transition"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Student Portal
            </h1>

            <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          {/* Search */}

          <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-4 py-3 w-80">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search lessons..."
              className="ml-3 flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}

          <NavLink
            to="/student/notifications"
            className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-100 transition"
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
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>
    </header>
  );
}
