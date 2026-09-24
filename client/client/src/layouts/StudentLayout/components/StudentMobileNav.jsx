import { NavLink } from "react-router-dom";
import { Calendar, Mail, Search, Settings } from "lucide-react";
import { MdDashboard } from "react-icons/md";

const mobileItems = [
  {
    icon: <MdDashboard size={22} />,
    title: "Home",
    path: "/student/dashboard",
  },
  {
    icon: <Search size={20} />,
    title: "Tutors",
    path: "/find-tutors",
  },
  {
    icon: <Calendar size={20} />,
    title: "Bookings",
    path: "/student/bookings",
  },
  {
    icon: <Mail size={20} />,
    title: "Inbox",
    path: "/student/messages",
  },
  {
    icon: <Settings size={20} />,
    title: "Profile",
    path: "/student/settings",
  },
];

export default function StudentMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#071320] border-t border-slate-800 shadow-2xl">
      <div className="grid grid-cols-5 h-16">
        {mobileItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center transition-all duration-300 ${
                isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
              }`
            }
          >
            {item.icon}

            <span className="text-[11px] mt-1 font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
