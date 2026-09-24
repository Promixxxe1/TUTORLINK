import { Rocket } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Users } from "lucide-react";
import { Brain } from "lucide-react";
import aboutUsImage from "../assets/about.png";
import video from "../assets/hero-video.mp4";
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
    <section className="pt-28">
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:py-30 lg:px-70 px-5 sm:px-10 leading-10 mb-10 m-auto ">
        {/**left ui//////....... */}
        <div>
          <span className="bg-gray-400 w-fit p-2 rounded-full tracking-widest text-white font-semibold leading-relaxed text-xs inline-block mb-6">
            OUR IDENTITY
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-10 ">
            Crafting the Future of{" "}
            <span className="text-gray-700">Knowledge</span>
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
            TutorLink is more than a marketplace. It's a digital atelier where
            academic mastery meets personalized apprenticeship, fostering a
            global community of lifelong learners.
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
        </div>

        {/**right ui........*/}
        <div>
          <img
            className="rounded-2xl w-500 object-cover"
            src={aboutUsImage}
            alt=""
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
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:sticky lg:top-24 w-full lg:w-1/3">
              <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">
                Our Mission
              </h2>
              <div className="h-1.5 w-12 bg-gray-700 rounded-full" />
            </div>
            <div className="w-full lg:w-2/3 space-y-8">
              <p className="text-3xl text-slate-900 leading-tight">
                To democratize access to elite mentorship, bridging the gap
                between passive learning and{" "}
                <span className="text-gray-700 font-semibold">
                  active intellectual growth.
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <section className="py-24 relative overflow-hidden">
        <video 
          src={video} 
          loop 
          muted 
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              The TutorLink Story
            </h2>
            <p className="text-lg text-gray-200 font-semibold max-w-2xl">
              Founded in 2024, our journey began with a simple observation: the
              digital classroom was missing a human soul.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            
            <div className=" text-white rounded-3xl p-10 flex flex-col justify-center space-y-6">
              <h4 className="text-6xl font-black text-white/80">50k+</h4>
              <p className="text-xl font-medium text-white/70">
                Hours of mentorship delivered across 40 countries in our first
                year.
              </p>
              <blockquote className="border-l-4 border-secondary pl-4 text-slate-300 italic">
                "We didn't want to build another app. We wanted to build a
                legacy of academic empowerment."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* value......... */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-700 text-lg font-medium">
              The principles that guide every interaction on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((values, index) => (
              <div
                key={values.title}
                className={`relative group ${index === 1 ? "md:mt-8" : ""} ${index === 2 ? "md:mt-16" : ""} `}
              >
                <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-300 group-hover:shadow-lg transition-all duration-300 h-full hover:translate-y-10">
                  <div
                    className={`w-16 h-16 ${values.color} rounded-2xl flex items-center justify-center mb-8`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {values.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {values.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {values.desc}
                  </p>
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
