import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 lg:p-10 text-white">
        {/* Decorative circles */}

        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
          {/* Left */}

          <div>
            <p className="uppercase tracking-[0.35em] text-cyan-300 text-xs font-bold">
              Student Dashboard
            </p>

            <h1 className="mt-5 text-4xl lg:text-5xl font-black leading-tight">
              Welcome Back,
              <br />
              <span className="text-cyan-300">
                {user?.name?.split(" ")[0] || "Student"} 👋
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-slate-300 leading-8">
              Continue learning, manage your lessons, monitor your progress, and
              stay connected with your tutors.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/find-tutors"
                className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-bold transition"
              >
                Find Tutors
              </Link>

              <button className="rounded-2xl border border-white/20 px-8 py-4 font-semibold hover:bg-white/10 transition">
                View Sessions
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-5 lg:w-[340px]">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6">
              <p className="text-sm text-slate-300">Upcoming</p>

              <h2 className="mt-3 text-4xl font-black">08</h2>

              <p className="text-cyan-300 text-sm mt-2">Lessons</p>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6">
              <p className="text-sm text-slate-300">Completed</p>

              <h2 className="mt-3 text-4xl font-black">42</h2>

              <p className="text-green-300 text-sm mt-2">Sessions</p>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 col-span-2">
              <p className="text-sm text-slate-300">Weekly Goal</p>

              <div className="mt-5 h-3 rounded-full bg-white/20 overflow-hidden">
                <div className="w-[75%] h-full bg-cyan-400 rounded-full" />
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span>75%</span>

                <span>6 / 8 Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            title: "Upcoming Lessons",
            value: 8,
            color: "bg-blue-500",
          },
          {
            title: "Completed",
            value: 42,
            color: "bg-green-500",
          },
          {
            title: "Saved Tutors",
            value: 14,
            color: "bg-pink-500",
          },
          {
            title: "Notifications",
            value: 5,
            color: "bg-orange-500",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:-translate-y-1 transition"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color}`} />

            <h2 className="mt-6 text-4xl font-black text-slate-800">
              {item.value}
            </h2>

            <p className="mt-2 text-slate-500">{item.title}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Upcoming Sessions
            </h2>

            <p className="text-slate-500">
              Your next scheduled learning sessions
            </p>
          </div>

          <Link
            to="/student/bookings"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-[30px] bg-white border border-slate-200 p-7 hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative Shape */}

              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-blue-100 group-hover:scale-125 transition duration-500" />

              <div className="relative z-10">
                <div className="flex justify-between items-center">
                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    CONFIRMED
                  </span>

                  <span className="text-sm text-slate-500">
                    Tomorrow • 10:00 AM
                  </span>
                </div>

                <h3 className="mt-8 text-3xl font-black text-slate-800">
                  Mathematics
                </h3>

                <p className="mt-2 text-slate-500">
                  Algebra & Linear Equations
                </p>

                <div className="flex items-center gap-4 mt-8">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />

                  <div>
                    <h4 className="font-bold text-slate-700">David Johnson</h4>

                    <p className="text-sm text-slate-500">
                      Senior Mathematics Tutor
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="flex-1 rounded-2xl bg-blue-600 text-white py-4 font-bold hover:bg-blue-700 transition">
                    Join Class
                  </button>

                  <button className="px-6 rounded-2xl border border-slate-200 hover:bg-slate-100 transition">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>

            <p className="text-slate-500">Jump straight into what you need.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Find Tutor",
              color: "from-blue-500 to-cyan-500",
              emoji: "📚",
              to: "/find-tutors",
            },
            {
              title: "Messages",
              color: "from-purple-500 to-indigo-600",
              emoji: "💬",
              to: "/student/messages",
            },
            {
              title: "Payments",
              color: "from-green-500 to-emerald-600",
              emoji: "💳",
              to: "/student/payments",
            },
            {
              title: "Progress",
              color: "from-orange-500 to-red-500",
              emoji: "📈",
              to: "/student/progress",
            },
          ].map((item) => (
            <NavLink
              key={item.item}
              to={item.to}
              className={`block rounded-3xl bg-gradient-to-br ${item.color} text-white p-8 text-left hover:scale-105 transition duration-300`}
            >
              <button
                key={item.title}
                onClick={() => navigate(item.to)}
              ></button>
              <div className="text-4xl">{item.emoji}</div>

              <h3 className="mt-8 text-xl font-bold">{item.title}</h3>

              <p className="mt-2 text-white/80 text-sm">Open</p>
            </NavLink>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Learning Progress
            </h2>

            <p className="text-slate-500">
              Your learning performance this month.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Circle */}

          <div className="bg-white rounded-[30px] border border-slate-200 p-8 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44">
              <div className="absolute inset-0 rounded-full border-[14px] border-slate-200"></div>

              <div className="absolute inset-0 rounded-full border-[14px] border-cyan-500 border-t-transparent border-l-transparent rotate-45"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-black text-slate-800">78%</h2>

                <p className="text-slate-500 mt-2">Overall Score</p>
              </div>
            </div>
          </div>

          {/* Subjects */}

          <div className="lg:col-span-2 bg-white rounded-[30px] border border-slate-200 p-8">
            {[
              {
                subject: "Mathematics",
                progress: "90%",
              },
              {
                subject: "Physics",
                progress: "75%",
              },
              {
                subject: "Chemistry",
                progress: "60%",
              },
              {
                subject: "English",
                progress: "96%",
              },
            ].map((item) => (
              <div key={item.subject} className="mb-6 last:mb-0">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-700">
                    {item.subject}
                  </span>

                  <span className="font-bold text-blue-600">
                    {item.progress}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    style={{ width: item.progress }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Recent Tutors</h2>

            <p className="text-slate-500">
              Tutors you've recently studied with.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[28px] border border-slate-200 p-7 text-center hover:-translate-y-2 transition"
            >
              <img
                src={`https://i.pravatar.cc/200?img=${item + 10}`}
                className="w-24 h-24 rounded-3xl object-cover mx-auto"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-800">
                David Johnson
              </h3>

              <p className="text-slate-500 mt-2">Mathematics Tutor</p>

              <button className="mt-6 w-full rounded-2xl bg-slate-900 text-white py-3 hover:bg-blue-600 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Recent Activity
            </h2>

            <p className="text-slate-500">Everything you've done recently.</p>
          </div>
        </div>

        <div className="bg-white rounded-[30px] border border-slate-200 p-8">
          {[
            "Completed Mathematics lesson",
            "Booked a new Physics tutor",
            "Paid for Chemistry session",
            "Received tutor feedback",
            "Started English course",
          ].map((activity, index) => (
            <div key={index} className="flex gap-5 pb-8 last:pb-0">
              <div className="w-4 h-4 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>

              <div>
                <h4 className="font-semibold text-slate-800">{activity}</h4>

                <p className="text-slate-500 text-sm mt-1">Today • 10:30 AM</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Learning History
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[30px] bg-white border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-8 py-5">Tutor</th>

                <th className="text-left px-8 py-5">Subject</th>

                <th className="text-left px-8 py-5">Date</th>

                <th className="text-left px-8 py-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <tr
                  key={item}
                  className="border-b last:border-none hover:bg-slate-50"
                >
                  <td className="px-8 py-6">David Johnson</td>

                  <td className="px-8 py-6">Mathematics</td>

                  <td className="px-8 py-6">Jul 5, 2026</td>

                  <td className="px-8 py-6">
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboardPage;
