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
    <div className="fixed top-0 left-0 w-full flex justify-between md:justify-evenly items-center px-6 md:px-0 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div>
        <Link to="/">
          <h2 className="font-extrabold text-3xl md:text-5xl cursor-pointer">
            TutorLink
          </h2>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        {isOpen ? (
          <X
            size={32}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Menu
            size={32}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <ul className="flex gap-5 text-xl py-5 text-gray-600 font-semibold">
          <li
            className={`cursor-pointer ${
              active === "Home" ? "text-black font-extrabold" : ""
            }`}
          >
            <Link to="/" onClick={() => setActive("Home")}>
              Home
            </Link>
          </li>

          <li
            className={`cursor-pointer ${
              active === "About Us" ? "text-black font-extrabold" : ""
            }`}
          >
            <Link to="/about" onClick={() => setActive("About Us")}>
              About Us
            </Link>
          </li>

          <li
            className={`cursor-pointer ${
              active === "Contact Us" ? "text-black font-extrabold" : ""
            }`}
          >
            <Link to="/contact" onClick={() => setActive("Contact Us")}>
              Contact Us
            </Link>
          </li>

          <li
            className={`cursor-pointer ${
              active === "Find Tutors" ? "text-black font-extrabold" : ""
            }`}
          >
            <Link to="/find-tutors" onClick={() => setActive("Find Tutors")}>
              Find Tutors
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:block">
        {!user ? (
          <div className="space-x-5">
            <Link to="/login" className="font-semibold text-gray-600 text-xl">
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-black text-white px-5 py-3 rounded-2xl text-xl"
            >
              Join Now
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-semibold">Hi, {user.name}</span>

            <Link
              to={
                user.role === "tutor"
                  ? "/tutor/dashboard"
                  : "/student/dashboard"
              }
              className="bg-black text-white px-5 py-3 rounded-2xl"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-6 py-8 text-lg font-semibold text-gray-600">
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
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/signup">Join Now</Link>
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
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
