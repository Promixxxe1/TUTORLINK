import { Rocket } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Users } from "lucide-react";
import { Brain } from "lucide-react";
import aboutUsImage from "../assets/about.png";
import heroVideo from "../assets/hero-video.mp4";
import { Link } from "react-router-dom";

const stats = [
  { value: "50,000+", label: "Students Taught" },
  { value: "1,200+", label: "Verified Tutors" },
  { value: "40+", label: "Countries Reached" },
  { value: "4.9★", label: "Average Rating" },
];

const values = [
  {
    icon: <Brain />,
    title: "Intellectual Integrity",
    desc: "We champion honest inquiry and the rigorous pursuit of truth. Our tutors don't just give answers — they teach how to find them.",
    color: "bg-[#0a2540] text-white",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Radical Inclusion",
    desc: "Education is a universal right. We foster a diverse environment where every voice and background is celebrated.",
    color: "bg-[#13696a] text-white",
  },
  {
    icon: <Rocket />,
    title: "Continuous Velocity",
    desc: "We move fast, we learn fast. Our platform evolves daily to integrate the latest pedagogical research and technology.",
    color: "bg-[#ffb95f] text-on-tertiary-fixed",
  },
];

const AboutUsPage = () => {
  return (
    <section className="w-full overflow-x-hidden pt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-12">
        <div>
          <span className="mb-6 inline-block rounded-full bg-gray-400 px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-white uppercase sm:text-xs">
            Our Identity
          </span>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-7xl">
            Crafting the Future of <span className="text-gray-700">Knowledge</span>
          </h1>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg lg:text-2xl">
            TutorLink is more than a marketplace. It&apos;s a digital atelier where academic mastery meets personalized apprenticeship, fostering a global community of lifelong learners.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Link
              to="/find-tutors"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:scale-[1.02] sm:px-8"
            >
              Find a Tutor
            </Link>
            <Link
              to="/tutor-application"
              className="rounded-2xl bg-gray-300 px-6 py-3 text-center font-semibold text-black transition hover:scale-[1.02] sm:px-8"
            >
              Become a Tutor
            </Link>
          </div>
        </div>

        <div>
          <img
            className="w-full rounded-2xl object-cover shadow-xl"
            src={aboutUsImage}
            alt="Tutors collaborating and learning"
          />
        </div>
      </div>
      {/** Statstats */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-black mb-2">
                  {s.value}
                </p>
                <p className="text-gray-400 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/** Mission and Vision */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="w-full lg:sticky lg:top-24 lg:w-1/3">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Mission
              </h2>
              <div className="h-1.5 w-12 rounded-full bg-gray-700" />
            </div>
            <div className="w-full space-y-8 lg:w-2/3">
              <p className="text-2xl leading-tight text-slate-900 sm:text-3xl">
                To democratize access to elite mentorship, bridging the gap between passive learning and <span className="font-semibold text-gray-700">active intellectual growth.</span>
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    icon: <Sparkles className="w-8 h-8" />,
                    title: "Personalized Path",
                    desc: "We believe every mind is unique. Our platform adapts to your pace, style, and specific academic goals.",
                  },
                  {
                    icon: <BadgeCheck className="w-8 h-8" />,
                    title: "Vetted Excellence",
                    desc: "Quality is non-negotiable. Every tutor is hand-picked through rigorous evaluation of both expertise and empathy.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-gray-200 p-8 rounded-2xl space-y-3 hover:bg-gray-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-4xl text-secondary">
                      {item.icon}
                    </span>
                    <h3 className="text-xl font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* story.... */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              The TutorLink Story
            </h2>
            <p className="text-base font-semibold text-gray-200 sm:text-lg">
              Founded in 2024, our journey began with a simple observation: the digital classroom was missing a human soul.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6 rounded-3xl p-6 text-white sm:p-10">
              <h4 className="text-5xl font-black text-white/80 sm:text-6xl">50k+</h4>
              <p className="text-lg font-medium text-white/70 sm:text-xl">
                Hours of mentorship delivered across 40 countries in our first year.
              </p>
              <blockquote className="border-l-4 border-slate-400 pl-4 text-slate-200 italic">
                &ldquo;We didn&apos;t want to build another app. We wanted to build a legacy of academic empowerment.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* value......... */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Our Core Values
            </h2>
            <p className="text-base font-medium text-gray-700 sm:text-lg">
              The principles that guide every interaction on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((values, index) => (
              <div
                key={values.title}
                className={`group relative ${index === 1 ? "md:mt-8" : ""} ${index === 2 ? "md:mt-16" : ""}`}
              >
                <div className="h-full rounded-4xl border border-gray-300 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-10">
                  <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${values.color}`}>
                    <span className="text-3xl">{values.icon}</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900">{values.title}</h3>
                  <p className="leading-relaxed text-slate-700">{values.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READY TO JOIN,,,,,,,,,,, */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Ready to join the intellectual renaissance?
            </h2>
            <p className="text-[#7dacd4] text-xl">
              Start your journey with a curated tutor session today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              to="/signup"
              className="px-10 py-4 bg-gray-600 text-white rounded-full font-bold hover:scale-105 transition-transform text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/find-tutors"
              className="px-10 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors text-lg"
            >
              View Tutors
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUsPage;
