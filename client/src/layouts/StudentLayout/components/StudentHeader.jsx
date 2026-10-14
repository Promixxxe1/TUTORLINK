import { NavLink } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import RefreshButton from "../../../components/RefreshButton";

export default function StudentHeader({
  user,
  avatarUrl,
  unreadCount,
  setSidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="hidden min-w-0 lg:flex lg:flex-col">
            <RefreshButton />
            <p className="truncate text-sm text-slate-500">
              Welcome back, {user?.name}
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
              placeholder="Search lessons..."
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <NavLink
            to="/student/notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100"
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
            className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-md"
          />
        </div>
      </div>
    </header>
  );
}
