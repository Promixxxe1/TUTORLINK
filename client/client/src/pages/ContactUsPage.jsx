import { Rocket, Mail, MapPin, Clock3 } from "lucide-react";

const ContactUsPage = () => {
  return (
    <section className="pt-28">
      <div className="bg-white">
        <div className="bg-slate-900 text-center leading-relaxed px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <h2 className="text-lg md:text-xl text-gray-400 uppercase leading-relaxed tracking-widest font-semibold">
            Get in Touch
          </h2>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-300">
            Contact Us
          </h1>

          <p className="text-gray-400 leading-relaxed text-base md:text-xl mt-3">
            Have a question or need help? We're here for you.
          </p>
        </div>
      </div>

      <div className="bg-gray-200 flex flex-col lg:flex-row justify-between gap-10 px-6 md:px-12 lg:px-20 py-12">
        {/* Left Section */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed mb-5">
            We'd Love to Hear From You!
          </h2>

          <p className="text-slate-900 font-semibold">
            Whether you have a question about features, pricing,
            <br className="hidden md:block" />
            need a demo, or anything else — our team is ready to answer all your
            questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Email Card */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4 hover:bg-blue-600 transition-colors duration-300">
                <Mail size={28} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Email
              </h3>

              <p className="text-slate-600 font-medium break-all">
                support@tutorlink.com
              </p>
            </div>

            {/* Location Card */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors duration-300">
                <MapPin size={28} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Location
              </h3>

              <p className="text-slate-600 font-medium">Lagos, Nigeria</p>
            </div>

            {/* Response Time Card */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 hover:bg-green-600 transition-colors duration-300">
                <Clock3 size={28} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Response Time
              </h3>

              <p className="text-slate-600 font-medium">Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed mb-6">
            Send us a message
          </h2>

          <form className="flex flex-col gap-5 bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-6 md:p-10">
            <h4 className="text-lg font-semibold text-slate-900">Full Name</h4>

            <input
              className="border border-gray-300 rounded-xl p-3 bg-gray-300 w-full"
              type="text"
              placeholder="Your Name"
            />

            <h4 className="text-lg font-semibold text-slate-900">Email</h4>

            <input
              className="border border-gray-300 rounded-xl p-3 bg-gray-300 w-full"
              type="email"
              placeholder="Your Email"
            />

            <h4 className="text-lg font-semibold text-slate-900">Subject</h4>

            <input
              className="border border-gray-300 rounded-xl p-3 bg-gray-300 w-full"
              type="text"
              placeholder="how can we help??"
            />

            <h4 className="text-lg font-semibold text-slate-900">Message</h4>

            <textarea
              rows={5}
              className="border border-gray-300 rounded-xl bg-gray-300 p-3 w-full"
              placeholder="Your Message"
            />

            <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl mx-auto text-lg md:text-xl hover:scale-105 transition-transform cursor-pointer">
              Send Message <Rocket className="inline-flex ml-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
