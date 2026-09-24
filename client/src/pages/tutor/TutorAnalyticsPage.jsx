import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { bookingAPI } from "../../services/api";

const ranges = ["7", "30", "90", "365"];

export default function TutorAnalyticsPage() {
  const { user } = useAuth();
  const [range, setRange] = useState("30");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await bookingAPI.getMyBookings();
        const tutorBookings = (res.data?.bookings || []).filter((booking) => {
          const tutorId = booking.tutor?._id || booking.tutor;
          const userId = user?.id || user?._id;
          return tutorId && userId && tutorId.toString() === userId.toString();
        });
        setBookings(tutorBookings);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load analytics.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const totalLessons = bookings.filter(
    (booking) => !["cancelled", "refunded"].includes(booking.status),
  ).length;
  const completedLessons = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;
  const ratedBookings = bookings.filter(
    (booking) => booking.isReviewed && Number(booking.rating) >= 1,
  );
  const reviewCount = ratedBookings.length;
  const avgRating =
    reviewCount > 0
      ? (
          ratedBookings.reduce(
            (sum, booking) => sum + Number(booking.rating || 0),
            0,
          ) / reviewCount
        ).toFixed(1)
      : "0.0";
  const totalStudents = new Set(
    bookings
      .map((booking) => booking.student?._id || booking.student)
      .filter(Boolean)
      .map((id) => id.toString()),
  ).size;

  const recentLessons = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date || booking.createdAt);
    const daysAgo =
      (Date.now() - bookingDate.getTime()) / (1000 * 60 * 60 * 24);
    return !Number.isNaN(bookingDate.getTime()) && daysAgo <= Number(range);
  }).length;

  const conversionRate =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const monthlyEarnings = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - (11 - index));
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();

    const total = bookings
      .filter((booking) => {
        const bookingDate = new Date(booking.date || booking.createdAt);
        return (
          !Number.isNaN(bookingDate.getTime()) &&
          bookingDate.getMonth() === month &&
          bookingDate.getFullYear() === year &&
          Number(booking.amount || 0) > 0
        );
      })
      .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

    return {
      _id: { month, year },
      total,
      count: bookings.filter((booking) => {
        const bookingDate = new Date(booking.date || booking.createdAt);
        return (
          !Number.isNaN(bookingDate.getTime()) &&
          bookingDate.getMonth() === month &&
          bookingDate.getFullYear() === year
        );
      }).length,
    };
  });

  const maxEarning = Math.max(
    ...monthlyEarnings.map((month) => month.total),
    1,
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const kpiCards = [
    {
      label: "Avg. Rating",
      value: avgRating,
      icon: "⭐",
      sub: `${reviewCount} review${reviewCount === 1 ? "" : "s"}`,
    },
    {
      label: "Total Lessons",
      value: String(totalLessons),
      icon: "📚",
      sub: `${recentLessons} this period`,
    },
    {
      label: "Total Students",
      value: String(totalStudents),
      icon: "👥",
      sub: "All time",
    },
    {
      label: "Completion Rate",
      value: `${conversionRate}%`,
      icon: "📈",
      sub: "Completed lessons",
    },
  ];

  return (
    <div className="max-w-5xl space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your performance and growth
          </p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl overflow-x-auto">
          {ranges.map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                range === item
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item === "365" ? "1 year" : `${item} days`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{card.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {card.value}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">
              {card.label}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <h2 className="font-bold text-slate-900 text-lg mb-6">
          Monthly Earnings
        </h2>

        {loading ? (
          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
        ) : monthlyEarnings.length === 0 ? (
          <div className="h-48 flex items-center justify-center">
            <p className="text-slate-500 text-sm">No earnings data yet</p>
          </div>
        ) : (
          <div className="flex items-end gap-2 h-48">
            {monthlyEarnings.map((month, index) => (
              <div
                key={`${month._id.year}-${month._id.month}`}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  ₦{(month.total / 1000).toFixed(0)}k
                </div>
                <div
                  className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-500"
                  style={{
                    height: `${(month.total / maxEarning) * 160}px`,
                    minHeight: "4px",
                  }}
                />
                <span className="text-[9px] text-slate-500 font-medium">
                  {months[index]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
