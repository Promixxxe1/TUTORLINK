import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link to="/" className="block">
            <h2 className="cursor-pointer text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              TutorLink
            </h2>
          </Link>
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <X
              size={30}
              className="cursor-pointer text-slate-800"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Menu
              size={30}
              className="cursor-pointer text-slate-800"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        <nav className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-6 text-base font-semibold text-gray-600 lg:gap-8 lg:text-lg">
            <li
              className={active === "Home" ? "font-extrabold text-black" : ""}
            >
              <Link to="/" onClick={() => setActive("Home")}>
                Home
              </Link>
            </li>

            <li
              className={
                active === "About Us" ? "font-extrabold text-black" : ""
              }
            >
              <Link to="/about" onClick={() => setActive("About Us")}>
                About Us
              </Link>
            </li>

            <li
              className={
                active === "Contact Us" ? "font-extrabold text-black" : ""
              }
            >
              <Link to="/contact" onClick={() => setActive("Contact Us")}>
                Contact Us
              </Link>
            </li>

            <li
              className={
                active === "Find Tutors" ? "font-extrabold text-black" : ""
              }
            >
              <Link to="/find-tutors" onClick={() => setActive("Find Tutors")}>
                Find Tutors
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:block">
          {!user ? (
            <div className="flex items-center gap-4 lg:gap-5">
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-600 lg:text-base"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 lg:px-5 lg:py-3 lg:text-base"
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 lg:gap-4">
              <span className="truncate text-sm font-semibold text-slate-700 lg:text-base">
                Hi, {user.name}
              </span>

              <Link
                to={
                  user.role === "tutor"
                    ? "/tutor/dashboard"
                    : "/student/dashboard"
                }
                className="rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 lg:px-5 lg:py-3"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-5 py-6 text-lg font-semibold text-gray-600">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setActive("Home");
                  setIsOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => {
                  setActive("About Us");
                  setIsOpen(false);
                }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  setActive("Contact Us");
                  setIsOpen(false);
                }}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/find-tutors"
                onClick={() => {
                  setActive("Find Tutors");
                  setIsOpen(false);
                }}
              >
                Find Tutors
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    Join Now
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={
                      user.role === "tutor"
                        ? "/tutor/dashboard"
                        : "/student/dashboard"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
