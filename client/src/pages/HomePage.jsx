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
    <div>
      <section className="relative overflow-hidden flex flex-col lg:flex-row justify-between gap-10 pt-28 sm:pt-32 lg:pt-40 lg:pb-30 lg:px-70 px-5 sm:px-10 leading-10 m-auto">
        {/* Video Background */}
        <video
          src={homevideo}
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-70"
        ></video>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/35 z-0"></div>

        {/**right ui,...................... */}
        <div className="mt-10 lg:mt-30 flex-1 relative z-10">
          <h4 className="bg-slate-700 w-fit p-2 rounded-full tracking-widest text-white font-semibold leading-relaxed text-xs inline-block mb-6">
            RISK-FREE TRIAL AVAILABLE
          </h4>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-10 text-white">
            Find Your <br />
            <em>
              <span className="text-gray-400 ">Perfect</span>
            </em>{" "}
            Tutor.
          </h1>
          <p className="text-gray-100 text-lg sm:text-xl lg:text-2xl leading-relaxed">
            Experience personalized learning designed to{" "}
            <br className="hidden sm:block" /> help you master any subject with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-10 ">
            <Link
              to="/find-tutors"
              className="hover:scale-105 transition-transform text-center bg-slate-900 rounded-2xl text-white px-8 sm:px-10 py-3 font-semibold cursor-pointer"
            >
              Find a Tutor
            </Link>
            <Link
              to="/tutor-application"
              className="hover:scale-105 transition-transform text-center bg-gray-300 rounded-2xl text-black px-8 sm:px-10 py-3 font-semibold cursor-pointer"
            >
              Become a Tutor
            </Link>
          </div>
          <p className="font-extralight mt-10 text-sm sm:text-base text-gray-100">
            <span className="font-semibold text-white">50,000+</span> students
            trust TutorLink
          </p>
        </div>

        {/**left/// ui,...................... */}
        <div className="mt-10 lg:mt-30 flex-1 flex justify-center items-center relative z-10"></div>
      </section>

      <section className="bg-gray-200">
        <div className="text-center leading-relaxed">
          <h2 className="text-4xl font-semibold pt-10">Why TutorLink?</h2>
          <p className="leading-relaxed p-2 text-md text-lg">
            Everything you need for a world-class learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 m-5 sm:m-10 px-5 sm:px-10 lg:px-50 pb-10 sm:pb-20 lg:pb-30 mb-6 ">
          {features.map((feature, index) => {
            const getIcon = () => {
              switch (feature.icon) {    
                case "shield":
                  return <ShieldCheck size={50} className="mb-4 bg-gray-300 p-1 rounded-xl hover:text-black" />;
                case "calendar":
                  return <Calendar size={50} className="mb-4 bg-gray-300 p-1 rounded-xl" />;
                case "card":
                  return <CreditCard size={50} className="mb-4 bg-gray-300 p-1 rounded-xl" />;
                default:
                  return <span>{feature.icon}</span>;
              }
            };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-2xl p-20 hover:bg-slate-900 duration-300 transition-all ease-in cursor-pointer text-slate-900 hover:text-white"
              >
                {getIcon()}
                <h2 className="text-3xl font-semibold">{feature.title}</h2>
                <p className="text-xl leading-tight">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <div className="flex flex-col sm:flex-row justify-between px-5 sm:px-10 lg:px-60 py-10 sm:py-20 gap-5">
          <div>
            <h3 className="text-lg text-gray-900 tracking-widest uppercase leading-relaxed">
              Featured Experts
            </h3>
            <h2 className="text-slate-900 font-semibold text-3xl sm:text-4xl leading-relaxed">
              Learn from the Best
            </h2>
          </div>
          <div>
            <Link to="/find-tutors">
              <a className="underline uppercase font-bold text-md" href="">
                Explore All →
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-24 md:py-32 bg-slate-900 text-white">
        <div className="text-center leading-relaxed px-5">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Master Any Skill in 3 Steps
          </h2>
          <p className="text-slate-400 fixed-dim max-w-2xl mx-auto text-sm sm:text-base">
            {" "}
            Our streamlined process ensures you find the right match without the
            stress.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 relative px-5 sm:px-10">
          <div className="hidden lg:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-white/10" />
          {steps.map((s) => (
            <div key={s.n} className="relative z-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl sm:text-3xl font-black shadow-2xl">
                {s.n}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
                {s.title}
              </h3>
              <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/**banner..................................... */}
      <section>
        <div className="bg-gray-300 p-5 sm:p-10 md:p-20 text-center relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-0 md:w-56 md:h-56 bg-gray-400 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black mb-6">
            Ready to unlock your potential?
          </h2>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto px-5">
            Join over 50,000 students who have improved their scores with
            TutorLink.
          </p>
          <button>
            <Link
              to="/signup"
              className="bg-slate-900 py-4 sm:py-6 px-8 sm:px-10 rounded-full text-white text-xl sm:text-2xl font-semibold cursor-pointer hover:scale-120 transition-transform all ease-in-out 0.4s"
            >
              Get Started Today
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
