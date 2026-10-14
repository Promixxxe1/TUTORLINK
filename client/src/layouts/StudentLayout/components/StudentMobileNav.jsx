import { useEffect, useState } from "react";
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

  return (
    <nav className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[94%] max-w-md -translate-x-1/2 transition-all duration-300 ease-out lg:hidden">
      <div
        className={`rounded-[1.5rem] border border-slate-700/80 bg-[#071320]/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isCompact ? "h-14" : "h-16"
        }`}
      >
        <div className="grid h-full grid-cols-5">
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

              <span className="mt-1 text-[10px] font-medium sm:text-[11px]">
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
