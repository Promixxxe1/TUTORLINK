import { Link } from "react-router-dom";
import {LuCircleCheckBig, LuLock} from "react-icons/lu";

const compliance = [
  { icon: <LuCircleCheckBig />, label: "GDPR Compliant" },
  { icon: <LuCircleCheckBig />, label: "CCPA Registered" },
  { icon: <LuCircleCheckBig />, label: "NDPR Compliant" },
  { icon: <LuCircleCheckBig />, label: "SOC2 Type II Certified" },
];

export default function DataPrivacyPage() {
  return (
    <div className="pt-28 text-gray-200">
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 text-center bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-600 text-white text-xs font-bold tracking-widest uppercase mb-6">
            Security & Trust
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
            Your Data is your{" "}
            <span className="text-gray-500 italic">Academic Legacy.</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto">
            At TutorLink, we treat your privacy with the same rigor we apply to
            our curriculum. Transparency isn't just a policy — it's our
            commitment.
          </p>
        </div>
      </section>

      {/* Compliance Bento */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* GDPR Card */}
          <div className="md:col-span-2 bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-green-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white material-symbols-filled">
                  <LuLock />
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                GDPR & Global Compliance
              </h2>
              <p className="text-gray-300 leading-relaxed max-w-md">
                We adhere to the highest standards of the General Data
                Protection Regulation. Your right to be forgotten and your right
                to data portability are core features of our platform, not
                afterthoughts.
              </p>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-slate-800 p-8 rounded-3xl border border-gray-700">
            <h3 className="text-lg font-bold text-green-500 mb-5">
              Compliance Status
            </h3>
            <div className="space-y-3">
              {compliance.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-500 material-symbols-filled text-[20px]">
                    {c.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* How We Use Data */}
          <div className="bg-gray-900 p-10 rounded-3xl text-white">
            <h2 className="text-2xl font-bold mb-6">
              How we use your information.
            </h2>
            <ul className="space-y-4">
              {[
                "Personalizing your learning path",
                "Facilitating secure tutor sessions",
                "Verifying academic credentials",
                "Processing payments securely",
                "Sending important notifications",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="material-symbols-outlined text-white flex-shrink-0">
                    <LuCircleCheckBig/>
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Encryption */}
          <div className="md:col-span-2 bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-48 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
                alt="Data security"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Encryption by Default.
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Every video call, chat message, and shared resource is protected
                by 256-bit AES encryption. Your intellectual exchanges remain
                strictly between you and your tutor.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="max-w-4xl mx-auto space-y-16">
          {[
            {
              num: "01. Collection",
              title: "Information we gather.",
              text: "We collect only what is necessary to build a superior learning experience. This includes basic account details, academic interests, and payment information processed through secure, third-party providers.",
              items: [
                {
                  heading: "Direct Data",
                  text: "Information you provide during sign-up and profile creation.",
                },
                {
                  heading: "Usage Data",
                  text: "Aggregated data on how you interact with courses and tools.",
                },
              ],
            },
            {
              num: "02. Ownership",
              title: "Your data, your rules.",
              text: "TutorLink does not sell your data. Period. We believe your learning habits and personal progress should never be monetized for advertising.",
              quote:
                '"The sanctity of the learning environment depends on the privacy of the student. We are here to protect that space."',
            },
          ].map((section) => (
            <div key={section.num}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
                {section.num}
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                {section.title}
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                {section.text}
              </p>
              {section.items && (
                <div className="grid grid-cols-2 gap-6">
                  {section.items.map((item) => (
                    <div
                      key={item.heading}
                      className="p-6 bg-slate-800 rounded-2xl"
                    >
                      <h4 className="font-bold text-green-500 mb-2">
                        {item.heading}
                      </h4>
                      <p className="text-sm text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {section.quote && (
                <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-green-600">
                  <p className="font-medium italic text-xl text-gray-300">
                    {section.quote}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/privacy-policy"
            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors text-center"
          >
            Read Full Privacy Policy
          </Link>
          <Link
            to="/data-deletion"
            className="px-8 py-4 border border-gray-700 text-slate-900 rounded-xl font-bold hover:bg-slate-800 transition-colors text-cente hover:text-white"
          >
            Request Data Deletion
          </Link>
        </div>
      </section>
    </div>
  );
}
