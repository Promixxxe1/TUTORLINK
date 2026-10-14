import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              TutorLink
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
              Redefining education through personalized, one-on-one mentorship from verified world-class experts.
            </p>
            <p className="text-lg text-slate-400">◯◯◯</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-900">
              PLATFORM
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 sm:text-base">
              <li><Link to="/find-tutors" className="hover:text-slate-900 hover:underline">Find Tutors</Link></li>
              <li><Link to="/tutor-application" className="hover:text-slate-900 hover:underline">Become a Tutor</Link></li>
              <li><Link to="/faqs" className="hover:text-slate-900 hover:underline">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-900">
              COMPANY
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 sm:text-base">
              <li><Link to="/about" className="hover:text-slate-900 hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-900">
              LEGAL
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 sm:text-base">
              <li><Link to="/privacy-policy" className="hover:text-slate-900 hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-slate-900 hover:underline">Terms Of Service</Link></li>
              <li><Link to="/legal" className="hover:text-slate-900 hover:underline">Legal</Link></li>
              <li><Link to="/data-privacy" className="hover:text-slate-900 hover:underline">Data Privacy</Link></li>
              <li><Link to="/data-deletion" className="hover:text-slate-900 hover:underline">Data Deletion</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm font-medium text-gray-600 sm:text-base">
            © 2026 TutorLink International Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 sm:text-base">
            <Link to="/privacy-policy" className="hover:text-slate-900 hover:underline">Privacy</Link>
            <Link to="/legal" className="hover:text-slate-900 hover:underline">Legal</Link>
            <Link to="/terms-of-service" className="hover:text-slate-900 hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
