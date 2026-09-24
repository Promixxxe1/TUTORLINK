import { useEffect, useState } from "react";
import { bookingAPI } from "../../services/api";
import { toast } from "react-toastify";

export default function TutorDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await bookingAPI.getMyBookings();

      setBookings(res.data.bookings || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await bookingAPI.approveBooking(bookingId);

      toast.success("Booking approved successfully.");

      // Refresh bookings so the status changes immediately
      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve booking.",
      );
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const pendingBookings = bookings.filter((booking) =>
    ["pending_approval", "pending_payment", "confirmed"].includes(
      booking.status,
    ),
  );

  const upcomingBookings = bookings.filter((booking) =>
    [
      "confirmed",
      "awaiting_link",
      "link_sent",
      "awaiting_confirmation",
    ].includes(booking.status),
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed",
  );

  const cancelledBookings = bookings.filter((booking) =>
    ["cancelled", "refunded"].includes(booking.status),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
          Tutor Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your lessons, bookings and students.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-500">Total Bookings</p>

          <h2 className="text-3xl font-black text-slate-900 mt-2">
            {bookings.length}
          </h2>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-500">Pending</p>

          <h2 className="text-3xl font-black text-yellow-600 mt-2">
            {pendingBookings.length}
          </h2>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-500">Upcoming</p>

          <h2 className="text-3xl font-black text-blue-600 mt-2">
            {upcomingBookings.length}
          </h2>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-500">Completed</p>

          <h2 className="text-3xl font-black text-green-600 mt-2">
            {completedBookings.length}
          </h2>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Bookings
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Bookings from your students
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-500">
              {bookings.length} total
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No bookings yet
            </h3>

            <p className="text-slate-500 mt-2">
              When students book your lessons, they will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking._id}
                className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
              >
                {/* Student */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      booking.student?.avatar ||
                      `https://i.pravatar.cc/100?u=${booking.student?._id}`
                    }
                    alt={booking.student?.name || "Student"}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {booking.student?.name || "Student"}
                    </h3>

                    <p className="text-sm text-slate-500">{booking.subject}</p>
                  </div>
                </div>

                {/* Lesson details */}
                <div>
                  <p className="font-semibold text-slate-800">{booking.date}</p>

                  <p className="text-sm text-slate-500">
                    {booking.time} • {booking.duration} mins
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex flex-col items-start gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase w-fit ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : booking.status === "disputed"
                            ? "bg-orange-100 text-orange-700"
                            : booking.status === "pending_approval"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {booking.status.replaceAll("_", " ")}
                  </span>

                  <p className="text-sm text-red-600 font-bold">
                    STATUS: {booking.status}
                  </p>

                  {booking.status === "pending_approval" && (
                    <button
                      onClick={() => handleApprove(booking._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-bold"
                    >
                      Approve Booking
                    </button>
                  )}
                </div>pem
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
