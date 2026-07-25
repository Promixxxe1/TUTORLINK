import { LuGavel, LuCopyright, LuShield, LuCircleCheckBig } from "react-icons/lu";
const legalSections = [
  {
    icon: <LuGavel />,
    title: "Legal Disclaimer",
    content: `The information provided by TutorLink on our platform is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.\n\nUnder no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided. Your use of the site is solely at your own risk.\n\nThis platform may contain links to external websites that are not provided or maintained by TutorLink. We do not guarantee the accuracy, relevance, or completeness of any information on these external websites.`,
    quote:
      '"The Academic Atelier is a facilitator of learning connections; we do not guarantee academic results or employment outcomes."',
  },
  {
    icon: <LuCopyright />,
    title: "Copyright Notice",
    content: `All content on TutorLink, including the design system, curriculum frameworks, proprietary algorithms, logos, and visual identifiers, are protected under international copyright law.\n\nUnauthorized reproduction, distribution, or modification of any content from this platform is strictly prohibited and may result in legal action.\n\n© 2026 TutorLink International Ltd. All rights reserved.`,
  },
  {
    icon: <LuShield />,
    title: "Intellectual Property",
    content: `Our platform architecture, visual identifiers, and the TutorLink methodology are proprietary assets. We actively monitor and defend against unauthorized reproduction of our instructional frameworks.\n\nTutors retain ownership of their original teaching materials. By uploading content to TutorLink, tutors grant us a non-exclusive license to display and distribute that content within the platform.`,
  },
];

const compliance = [
  "GDPR Compliant",
  "CCPA Registered",
  "SOC2 Type II Certified",
  "NDPR Compliant",
];

export default function LegalPage() {
  return (
    <div className=" pt-29">
      <section className="py-20 md:py-28 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-slate-600 text-white rounded-full">
            Official Statement
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            Legal &<br />
            <span className="text-gray-500">Regulatory Affairs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Transparency is the foundation of TutorLink. We provide clear,
            comprehensive information regarding our operations, intellectual
            property, and user safeguards.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 space-y-8">
            {legalSections.map((section) => (
              <div
                key={section.title}
                className="bg-gray-800 p-8 md:p-12 rounded-3xl border border-gray-700 shadow-md"
              >
                <div className="flex items-center gap-3 mb-6 text-green-500">
                  <span className="material-symbols-outlined material-symbols-filled">
                    {section.icon}
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  {section.content.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm">
                      {para}
                    </p>
                  ))}
                  {section.quote && (
                    <div className="p-5 bg-slate-700 rounded-xl border-l-4 border-green-500 mt-4">
                      <p className="italic text-gray-300 text-sm">
                        {section.quote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <aside className="md:col-span-4 space-y-6">
            <div className="bg-gray-600 text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute -right-8 opacity-20">
                <span className="material-symbols-outlined text-9xl">
                  TUTOR <br /> LINK
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">
                Copyright
              </h3>
              <p className="text-white text-sm leading-relaxed mb-4 relative z-10">
                All content, design systems, and proprietary algorithms are
                protected under international copyright law.
              </p>
              <div className="text-3xl font-mono relative z-10 font-black">
                © 2026
              </div>
              <div className="text-sm font-medium opacity-80 relative z-10">
                TutorLink International Ltd.
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-gray-700">
              <h3 className="text-lg font-bold text-green-500 mb-4">
                Compliance Status
              </h3>
              <ul className="space-y-3">
                {compliance.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500 material-symbols-filled text-[20px]">
                      <LuCircleCheckBig/>
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
              <h3 className="text-sm font-bold text-green-500 mb-3">
                IP Protection
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "TRADEMARKED",
                  "PATENT PENDING",
                  "ENCRYPTED",
                  "PROPRIETARY",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container-highest px-3 py-1.5 rounded-full text-[10px] font-bold text-green-500 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-700 rounded-2xl text-sm text-gray-300">
              Questions regarding our legal framework can be directed to{" "}
              <a
                href="mailto:legal@tutorlink.com"
                className="text-green-500 font-semibold hover:underline"
              >
                legal@tutorlink.com
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
