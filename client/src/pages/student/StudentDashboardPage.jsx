import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { bookingAPI } from "../../services/api";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingAPI.getMyBookings();
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch student bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const upcomingBookings = bookings.filter((booking) =>
    [
      "confirmed",
      "awaiting_link",
      "link_sent",
      "pending_payment",
      "pending_approval",
      "awaiting_confirmation",
    ].includes(booking.status),
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed",
  );

  const uniqueTutors = new Set(
    bookings
      .map((booking) => booking.tutor?._id || booking.tutor)
      .filter(Boolean)
      .map((id) => id.toString()),
  ).size;

  const needsAction = bookings.filter((booking) =>
    ["pending_approval", "awaiting_confirmation", "link_sent"].includes(
      booking.status,
    ),
  ).length;

  const weeklyGoal = Math.min(
    100,
    Math.round(
      ((upcomingBookings.length + completedBookings.length) / 8) * 100,
    ),
  );
  const weeklyGoalText = `${Math.min(upcomingBookings.length + completedBookings.length, 8)} / 8 Lessons`;

  const recentBookings = bookings
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
    )
    .slice(0, 5);

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

              <h2 className="mt-3 text-4xl font-black">
                {loading ? "..." : upcomingBookings.length}
              </h2>

              <p className="text-cyan-300 text-sm mt-2">Lessons</p>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6">
              <p className="text-sm text-slate-300">Completed</p>

              <h2 className="mt-3 text-4xl font-black">
                {loading ? "..." : completedBookings.length}
              </h2>

              <p className="text-green-300 text-sm mt-2">Sessions</p>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 col-span-2">
              <p className="text-sm text-slate-300">Weekly Goal</p>

              <div className="mt-5 h-3 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${weeklyGoal}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span>{weeklyGoal}%</span>

                <span>{loading ? "..." : weeklyGoalText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            title: "Upcoming Lessons",
            value: loading ? "..." : upcomingBookings.length,
            color: "bg-blue-500",
          },
          {
            title: "Completed",
            value: loading ? "..." : completedBookings.length,
            color: "bg-green-500",
          },
          {
            title: "Tutors Booked",
            value: loading ? "..." : uniqueTutors,
            color: "bg-pink-500",
          },
          {
            title: "Needs Action",
            value: loading ? "..." : needsAction,
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
          {loading ? (
            <div className="col-span-2 text-center py-10 text-slate-500">
              Loading upcoming sessions...
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="col-span-2 bg-white rounded-[30px] border border-slate-200 p-7 text-center text-slate-500">
              You do not have any upcoming lessons yet.
            </div>
          ) : (
            upcomingBookings.slice(0, 2).map((booking) => (
              <div
                key={booking._id}
                className="group relative overflow-hidden rounded-[30px] bg-white border border-slate-200 p-7 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-blue-100 group-hover:scale-125 transition duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">
                      {booking.status.replaceAll("_", " ")}
                    </span>

                    <span className="text-sm text-slate-500">
                      {booking.date} • {booking.time}
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-black text-slate-800">
                    {booking.subject}
                  </h3>

                  <p className="mt-2 text-slate-500">{booking.type} lesson</p>

                  <div className="flex items-center gap-4 mt-8">
                    <img
                      src={
                        booking.tutor?.avatar ||
                        `https://i.pravatar.cc/100?u=${booking.tutor?._id || booking.tutor}`
                      }
                      className="w-14 h-14 rounded-2xl object-cover"
                      alt={booking.tutor?.name || "Tutor"}
                    />

                    <div>
                      <h4 className="font-bold text-slate-700">
                        {booking.tutor?.name || "Tutor"}
                      </h4>

                      <p className="text-sm text-slate-500">Tutor</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    {booking.status === "link_sent" ? (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-2xl bg-blue-600 text-center text-white py-4 font-bold hover:bg-blue-700 transition"
                      >
                        Join Class
                      </a>
                    ) : (
                      <button className="flex-1 rounded-2xl bg-blue-600 text-white py-4 font-bold hover:bg-blue-700 transition">
                        View Booking
                      </button>
                    )}

                    <Link
                      to="/student/bookings"
                      className="px-6 rounded-2xl border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
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
          {recentBookings.length === 0 ? (
            <div className="md:col-span-2 xl:col-span-4 bg-white rounded-[28px] border border-slate-200 p-7 text-center text-slate-500">
              No recent tutors yet.
            </div>
          ) : (
            [
              ...new Map(
                recentBookings
                  .filter((booking) => booking.tutor)
                  .map((booking) => [
                    booking.tutor?._id || booking.tutor,
                    booking,
                  ]),
              ).values(),
            ]
              .slice(0, 4)
              .map((booking) => (
                <div
                  key={booking.tutor?._id || booking.tutor}
                  className="bg-white rounded-[28px] border border-slate-200 p-7 text-center hover:-translate-y-2 transition"
                >
                  <img
                    src={
                      booking.tutor?.avatar ||
                      `https://i.pravatar.cc/200?u=${booking.tutor?._id || booking.tutor}`
                    }
                    className="w-24 h-24 rounded-3xl object-cover mx-auto"
                    alt={booking.tutor?.name || "Tutor"}
                  />

                  <h3 className="mt-6 text-xl font-bold text-slate-800">
                    {booking.tutor?.name || "Tutor"}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {booking.subject || "Tutor"}
                  </p>

                  <Link
                    to={`/tutors/${booking.tutor?._id || booking.tutor}`}
                    className="mt-6 block w-full rounded-2xl bg-slate-900 text-white py-3 hover:bg-blue-600 transition text-center"
                  >
                    View Profile
                  </Link>
                </div>
              ))
          )}
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
              {recentBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-6 text-center text-slate-500"
                  >
                    No recent activity yet.
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b last:border-none hover:bg-slate-50"
                  >
                    <td className="px-8 py-6">
                      {booking.tutor?.name || "Tutor"}
                    </td>

                    <td className="px-8 py-6">{booking.subject}</td>

                    <td className="px-8 py-6">{booking.date || "N/A"}</td>

                    <td className="px-8 py-6">
                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        {booking.status.replaceAll("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboardPage;
