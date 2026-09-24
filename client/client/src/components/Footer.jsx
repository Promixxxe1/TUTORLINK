import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
      <div>
        <hr className="text-gray-400" />
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-10">
        {/* Left Section */}
        <div>
          <h2 className="font-extrabold text-5xl leading-relaxed">TutorLink</h2>
          <p className="text-gray-600 font-semibold leading-relaxed">
            Redefining education through personalized,
            <br /> one-on-one mentorship from verified <br /> world-class
            experts
          </p>
          <p>◯◯◯</p>
        </div>

        {/* Footer Links */}
        <div>
          <h2 className="text-slate-900 font-semibold tracking-widest">
            PLATFORM
          </h2>
          <ul className="text-gray-600">
            <Link to="/find-tutors">
              <li className="hover:underline cursor-pointer">Find Tutors</li>
            </Link>
            <Link to="/compare-tutors">
              <li className="hover:underline cursor-pointer">Compare Tutors</li>
            </Link>
            <Link to="/tutor-application">
              <li className="hover:underline cursor-pointer">Become a Tutor</li>
            </Link>
            <Link to="/faqs">
              <li className="hover:underline cursor-pointer">FAQs</li>
            </Link>
          </ul>
        </div>

        <div>
          <h2 className="text-slate-900 font-semibold tracking-widest">
            COMPANY
          </h2>
          <ul className="text-gray-600">
            <Link to="/about">
              <li className="hover:underline cursor-pointer">About Us</li>
            </Link>
            <Link to="/contact">
              <li className="hover:underline cursor-pointer">Contact</li>
            </Link>
            <Link to="/live-support">
              <li className="hover:underline cursor-pointer">Live Support</li>
            </Link>
          </ul>
        </div>

        <div>
          <h2 className="text-slate-900 font-semibold tracking-widest">
            LEGAL
          </h2>
          <ul className="text-gray-600">
            <Link to="/privacy-policy">
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
            </Link>
            <Link to="/terms-of-service">
              <li className="hover:underline cursor-pointer">
                Terms Of Service
              </li>
            </Link>
            <Link to="/legal">
              <li className="hover:underline cursor-pointer">Legal</li>
            </Link>
            <Link to="/data-privacy">
              <li className="hover:underline cursor-pointer">Data Privacy</li>
            </Link>
            <Link to="/data-deletion">
              <li className="hover:underline cursor-pointer">Data Deletion</li>
            </Link>
          </ul>
        </div>
      </div>

      <hr className="mx-6 my-10 text-gray-300" />

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-10">
        <div>
          <p className="text-gray-600 font-semibold">
            © 2026 TutorLink International Ltd. All rights reserved.
          </p>
        </div>
        <div className="flex gap-5 mt-4 md:mt-0">
          <Link to="/privacy-policy">
            <p className="hover:text-slate-900 text-gray-600 cursor-pointer">
              Privacy
            </p>
          </Link>
          <Link to="/legal">
            <p className="hover:text-slate-900 text-gray-600 cursor-pointer">
              Legal
            </p>
          </Link>
          <Link to="/terms-of-service">
            <p className="hover:text-slate-900 text-gray-600 cursor-pointer">
              Terms
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
