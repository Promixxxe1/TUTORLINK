import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "agreement",
    num: "01",
    title: "User Agreement",
    content: `By accessing or using TutorLink, you agree to be bound by these terms. This agreement constitutes a legally binding contract between you and TutorLink regarding your access to and use of our academic platform.\n\nUsers must be at least 18 years of age or have parental consent to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.\n\nAll tutors undergo internal background checks and credential verification. Users must adhere to academic honesty standards at all times.`,
  },
  {
    id: "payment",
    num: "02",
    title: "Payment Terms",
    content: `Payments are processed securely via Paystack. Users agree to pay the rates specified at the time of booking. TutorLink charges a platform service fee (currently 10%) which is clearly itemized during checkout.\n\nSubscriptions and recurring packages are billed at the beginning of each cycle. Failure to complete payment may result in immediate suspension of tutoring sessions.\n\nAll prices are displayed in Nigerian Naira (₦) unless otherwise stated. TutorLink reserves the right to modify pricing with 30 days notice.`,
  },
  {
    id: "cancellation",
    num: "03",
    title: "Cancellation Policy",
    content: `Sessions cancelled more than 24 hours in advance are eligible for a full refund to the original payment method.\n\nSessions cancelled within 24 hours of the scheduled start time are subject to a 50% cancellation fee.\n\n"No-shows" (failure to attend within 15 minutes of session start) are billed at the full rate. Exceptions are only made for documented medical emergencies.\n\nTutors who cancel without adequate notice may face account suspension and are required to issue full refunds.`,
  },
  {
    id: "liability",
    num: "04",
    title: "Limitation of Liability",
    content: `TutorLink provides an intermediary platform for educational services. We do not guarantee specific academic outcomes, grades, or test scores.\n\nTo the maximum extent permitted by law, TutorLink and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in any way connected with the use of our services.\n\nTutorLink's total liability for any claim arising from these terms shall not exceed the amount paid by you to TutorLink in the 3 months preceding the claim.`,
  },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("agreement");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id),
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport
      sectionElements.forEach((section, index) => {
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-gray-200 pt-28">
      {/* Hero */}
      <section className="bg-slate-900   text-gray-400 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-slate-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Legal Policies
          </span>
          <h1 className="text-5xl font-black leading-none tracking-tighter mb-6">
            Terms of <br />
            <span className="text-slate-300">Service.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed">
            These terms govern your use of TutorLink's platform and professional
            learning services.
          </p>
          <p className="text-sm mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-slate-900 text-green-600 font-bold shadow-sm"
                      : "text-slate-900 hover:bg-gray-700 hover:text-green-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === s.id ? "bg-green-600" : "bg-gray-500"}`}
                  />
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 pt-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-green-600 text-sm font-black tracking-widest">
                    {s.num} / 04
                  </span>
                  <div className="h-px flex-1 bg-gray-700" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  {s.title}
                </h2>
                <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-sm">
                  {s.content.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-gray-200 leading-relaxed mb-4 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Support Banner */}
            <div className="bg-green-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Need clarification?
                </h3>
                <p className="text-gray-700 text-sm">
                  Our legal team is available to explain our policies in detail.
                </p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                Contact Support
                <span className="material-icons">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
