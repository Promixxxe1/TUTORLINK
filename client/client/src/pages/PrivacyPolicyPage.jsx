import { Eye, Cookie, Share2, ShieldUser } from "lucide-react";
import { useState } from "react";
import { LuDatabase,  } from "react-icons/lu";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "information",
    icon: <LuDatabase />,
    title: "Information We Collect",
    content: [
      {
        heading: "Personal Data",
        text: "Name, email address, postal address, phone number, and any other information you choose to provide during account creation.",
      },
      {
        heading: "Academic Profile",
        text: "Subjects of interest, educational background, learning goals, session transcripts, and tutor preferences.",
      },
      {
        heading: "Usage Data",
        text: "Log information, device information, IP address, browser type, pages visited, and information collected by cookies.",
      },
      {
        heading: "Payment Data",
        text: "Payment information is processed securely via Paystack. We do not store credit card details on our servers.",
      },
    ],
  },
  {
    id: "usage",
    icon: <Eye />,
    title: "How We Use Your Data",
    content: [
      {
        heading: "Service Provision",
        text: "To match students with tutors, manage scheduled sessions, and facilitate communication between parties.",
      },
      {
        heading: "Personalization",
        text: "To curate tutor recommendations and learning resources tailored to your academic goals and preferences.",
      },
      {
        heading: "Communication",
        text: "To send technical notices, updates, security alerts, booking confirmations, and support messages.",
      },
      {
        heading: "Platform Improvement",
        text: "To analyze usage patterns and improve our platform features, performance, and user experience.",
      },
    ],
  },
  {
    id: "cookies",
    icon: <Cookie />,
    title: "Cookies Policy",
    content: [
      {
        heading: "Essential Cookies",
        text: "Required for the platform to function. These remember your login status and security preferences.",
      },
      {
        heading: "Analytics Cookies",
        text: "Help us understand how users interact with TutorLink so we can improve the experience.",
      },
      {
        heading: "Preference Cookies",
        text: "Remember your settings such as language, theme, and notification preferences.",
      },
    ],
  },
  {
    id: "sharing",
    icon: <Share2 />,
    title: "Third-Party Sharing",
    content: [
      {
        heading: "Payment Processors",
        text: "We use Paystack to process payments securely. They operate under their own privacy policy and PCI-DSS compliance.",
      },
      {
        heading: "Cloud Infrastructure",
        text: "Session data is hosted on encrypted servers provided by our technology partners with strict data processing agreements.",
      },
      {
        heading: "No Data Sales",
        text: "TutorLink never sells your personal data or learning habits to marketing firms or third parties. Period.",
      },
    ],
  },
  {
    id: "rights",
    icon: <ShieldUser />,
    title: "Your Rights",
    content: [
      {
        heading: "Right to Access",
        text: "You can request a copy of all personal data we hold about you at any time.",
      },
      {
        heading: "Right to Deletion",
        text: "You can request permanent deletion of your account and associated data. See our Data Deletion page.",
      },
      {
        heading: "Right to Correction",
        text: "You can update or correct your personal information through your account settings.",
      },
      {
        heading: "Right to Portability",
        text: "You can request your data in a machine-readable format for transfer to another service.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("information");

  return (
    <div className="bg-gray-50 text-gray-800 pt-28">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-slate-700 rounded-full text-xs font-bold tracking-widest mb-6">
            Legal Framework
          </span>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl">
            Your trust is our most valuable asset. This policy outlines how
            TutorLink handles your personal data with transparency and respect.
          </p>
          <p className="text-sm mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? "text-white bg-slate-900 font-bold"
                      : "text-gray-700 hover:text-white-600 hover:bg-gray-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${activeSection === s.id ? "bg-white" : "bg-gray-400"}`}
                  />
                  {s.title}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-300">
                <Link
                  to="/data-deletion"
                  className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <span className="material-icons">delete_forever</span>
                  Request Data Deletion
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <div className="bg-white rounded-lg p-6 shadow relative">
                  <div className="flex items-center gap-3 mb-8 relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="material-icons text-slate-900">
                        {s.icon}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {s.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.content.map((item) => (
                      <div
                        key={item.heading}
                        className="bg-gray-100 p-5 rounded-lg border-l-4 border-slate-600"
                      >
                        <h3 className="font-bold text-gray-900 mb-2 text-sm">
                          {item.heading}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Contact CTA */}
            <div className="bg-blue-100 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Have questions about your data?
                </h3>
                <p className="text-gray-700">
                  Our privacy team is here to help with any data concerns.
                </p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:scale-105 transition-transform"
              >
                Contact Privacy Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
