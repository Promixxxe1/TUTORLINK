import { Link } from "react-router-dom";
import { ShieldCheck, Calendar, CreditCard } from "lucide-react";
import homevideo from "../assets/homepage-video.mp4";

const features = [
  {
    icon: "shield",
    title: "Certified Tutors",
    desc: "Every tutor undergoes rigorous background checks and credential verification.",
  },
  {
    icon: "calendar",
    title: "Flexible Scheduling",
    desc: "Learn on your own terms. Book sessions that fit your lifestyle, 24/7.",
  },
  {
    icon: "card",
    title: "Pay per Lesson",
    desc: "No hidden monthly fees or lock-in contracts. Only pay for what you learn.",
  },
];

const steps = [
  {
    n: "1",
    title: "Search",
    desc: "Browse thousands of verified tutors by subject, price, and availability.",
  },
  {
    n: "2",
    title: "Trial",
    desc: "Book a discounted 30-minute intro lesson to ensure the style works for you.",
  },
  {
    n: "3",
    title: "Subscribe",
    desc: "Once you find the perfect fit, schedule regular sessions and watch grades soar.",
  },
];

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-slate-900">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-28">
          <video
            src={homevideo}
            loop
            muted
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover brightness-70"
          ></video>

          <div className="absolute inset-0 bg-black/35"></div>

          <div className="relative z-10 max-w-2xl">
            <h4 className="mb-6 inline-block rounded-full bg-slate-700 px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-white uppercase sm:text-xs">
              Risk-free trial available
            </h4>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              Find Your <span className="text-gray-400">Perfect</span> Tutor.
            </h1>
            <p className="text-base leading-relaxed text-gray-100 sm:text-lg lg:text-2xl">
              Experience personalized learning designed to help you master any
              subject with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <p className="mt-8 text-sm text-gray-100 sm:text-base">
              <span className="font-semibold text-white">50,000+</span> students
              trust TutorLink
            </p>
          </div>

          <div className="relative z-10 hidden flex-1 lg:block" />
        </div>
      </section>

      <section className="bg-gray-200 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why TutorLink?
            </h2>
            <p className="mt-3 text-base text-slate-700 sm:text-lg">
              Everything you need for a world-class learning experience.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const getIcon = () => {
                switch (feature.icon) {
                  case "shield":
                    return (
                      <ShieldCheck
                        size={40}
                        className="mb-4 rounded-xl bg-gray-300 p-2"
                      />
                    );
                  case "calendar":
                    return (
                      <Calendar
                        size={40}
                        className="mb-4 rounded-xl bg-gray-300 p-2"
                      />
                    );
                  case "card":
                    return (
                      <CreditCard
                        size={40}
                        className="mb-4 rounded-xl bg-gray-300 p-2"
                      />
                    );
                  default:
                    return <span>{feature.icon}</span>;
                }
              };

              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-xl transition duration-300 hover:bg-slate-900 hover:text-white sm:p-8"
                >
                  {getIcon()}
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed sm:text-lg">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">
              Featured Experts
            </h3>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Learn from the Best
            </h2>
          </div>
          <Link
            to="/find-tutors"
            className="text-sm font-bold uppercase underline sm:text-base"
          >
            Explore All →
          </Link>
        </div>
      </section>

      <section className="bg-slate-900 py-12 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Master Any Skill in 3 Steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
              Our streamlined process ensures you find the right match without
              the stress.
            </p>
          </div>
          <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="absolute left-[15%] right-[15%] top-10 hidden h-0.5 bg-white/10 lg:block" />
            {steps.map((s) => (
              <div key={s.n} className="relative z-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-600 text-2xl font-black shadow-2xl sm:h-20 sm:w-20 sm:text-3xl">
                  {s.n}
                </div>
                <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-300">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gray-300 p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-10 top-0 hidden h-40 w-40 rounded-full bg-gray-400 md:block" />
            <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
              Ready to unlock your potential?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700 sm:text-lg">
              Join over 50,000 students who have improved their scores with
              TutorLink.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block rounded-full bg-slate-900 px-8 py-4 text-lg font-semibold text-white transition hover:scale-[1.02] sm:px-10 sm:text-2xl"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
