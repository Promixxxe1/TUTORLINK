import {
  Calendar,
  Mail,
  Search,
  Settings,
  Star,
  CreditCard,
  BookHeart,
  ChartNoAxesCombined,
  ReceiptText,
  Phone,
  BookPlus,
  LogOut,
  BookOpen,
  X,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    icon: <MdDashboard size={22} />,
    title: "Dashboard",
    path: "/student/dashboard",
  },
  {
    icon: <Search size={20} />,
    title: "Find Tutors",
    path: "/find-tutors",
  },
  {
    icon: <Calendar size={20} />,
    title: "Bookings",
    path: "/student/bookings",
  },
  {
    icon: <Mail size={20} />,
    title: "Messages",
    path: "/student/messages",
  },
  {
    icon: <BookHeart size={20} />,
    title: "Favourites",
    path: "/student/favourites",
  },
  {
    icon: <ChartNoAxesCombined size={20} />,
    title: "Progress",
    path: "/student/progress",
  },
  {
    icon: <Star size={20} />,
    title: "Reviews",
    path: "/student/reviews",
  },
  {
    icon: <CreditCard size={20} />,
    title: "Payments",
    path: "/student/payments",
  },
  {
    icon: <ReceiptText size={20} />,
    title: "Invoices",
    path: "/student/invoices",
  },
  {
    icon: <Phone size={20} />,
    title: "Support",
    path: "/student/support",
  },
  {
    icon: <Settings size={20} />,
    title: "Settings",
    path: "/student/settings",
  },
];

export default function StudentSideBar({
  user,
  avatarUrl,
  logout,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-[#071320] border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}

        <div className="px-8 py-7 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-white text-2xl font-black">TutorLink</h1>

              <p className="text-slate-400 text-sm">Learn • Grow • Excel</p>
            </div>
          </div>

          {/* Close Button */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Card */}

        <div className="p-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-5">
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl}
                alt={user?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-cyan-500/20"
              />

              <div className="min-w-0">
                <h3 className="text-white font-bold truncate">{user?.name}</h3>

                <p className="text-cyan-400 text-sm">Student Account</p>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <p className="text-xs uppercase text-slate-500">Status</p>

                <p className="text-emerald-400 font-semibold">Active</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Sessions</p>

                <p className="text-white font-semibold">28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-5 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}

              <span className="font-semibold tracking-wide">{item.title}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Buttons */}

        <div className="p-6 border-t border-slate-800">
          <NavLink
            to="/find-tutors"
            className="flex items-center justify-center gap-3 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white hover:scale-[1.02] transition"
          >
            <BookPlus size={20} />
            Book Session
          </NavLink>

          <button
            onClick={logout}
            className="w-full mt-4 rounded-2xl border border-slate-700 py-4 text-slate-300 hover:bg-red-500 hover:border-red-500 hover:text-white transition flex items-center justify-center gap-3"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
