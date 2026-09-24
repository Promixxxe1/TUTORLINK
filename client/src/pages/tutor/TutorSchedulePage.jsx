import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookingAPI } from "../../services/api";
import { toast } from "react-toastify";

const statusColors = {
  pending_approval: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  awaiting_link: "bg-blue-100 text-blue-800",
  link_sent: "bg-indigo-100 text-indigo-800",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
  disputed: "bg-orange-100 text-orange-700",
};

export default function TutorSchedulePage() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [linkModalBooking, setLinkModalBooking] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [linkSubmitting, setLinkSubmitting] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await bookingAPI.getMyBookings();

      // Only show bookings where the logged-in user is the tutor
      const tutorBookings = res.data.bookings.filter((booking) => {
        const tutorId = booking.tutor?._id || booking.tutor;
        const userId = user?.id || user?._id;
        return tutorId && userId && tutorId.toString() === userId.toString();
      });

      setBookings(tutorBookings || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      setActionLoading(true);
      await bookingAPI.approveBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "confirmed" }
            : booking,
        ),
      );
      toast.success("Booking approved successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve booking.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      setActionLoading(true);
      await bookingAPI.cancelBooking(bookingId, "Rejected by tutor");
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );
      toast.success("Booking rejected.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject booking.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendMeetingLink = async () => {
    if (!linkModalBooking) return;

    const trimmedLink = meetingLink.trim();

    if (!trimmedLink) {
      toast.error("Please enter a meeting link.");
      return;
    }

    try {
      setLinkSubmitting(true);
      await bookingAPI.addMeetingLink(linkModalBooking._id, trimmedLink);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === linkModalBooking._id
            ? { ...booking, status: "link_sent", meetingLink: trimmedLink }
            : booking,
        ),
      );
      toast.success("Meeting link sent successfully.");
      setLinkModalBooking(null);
      setMeetingLink("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send meeting link.",
      );
    } finally {
      setLinkSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            My Schedule
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your upcoming lessons and booking requests.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-500">Loading your schedule...</p>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-xl font-bold text-slate-800">
              No bookings yet
            </h2>

            <p className="text-slate-500 mt-2">
              Student booking requests will appear here.
            </p>
          </div>
        ) : (
          /* Bookings */
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Booking information */}
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        statusColors[booking.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {booking.status.replaceAll("_", " ")}
                    </span>

                    <h2 className="text-xl font-bold text-slate-900 mt-3">
                      {booking.subject}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      📅 {booking.date} &nbsp; • &nbsp; 🕐 {booking.time}
                    </p>

                    <p className="text-slate-500 mt-1">
                      Duration: {booking.duration} minutes
                    </p>

                    {/* Student */}
                    <div className="flex items-center gap-3 mt-5">
                      <img
                        src={
                          booking.student?.avatar ||
                          `https://i.pravatar.cc/100?u=${booking.student?._id}`
                        }
                        alt={booking.student?.name || "Student"}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-xs text-slate-400">Student</p>

                        <p className="font-semibold text-slate-800">
                          {booking.student?.name || "Student"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[180px]">
                    {booking.amount > 0 && (
                      <div className="text-center mb-2">
                        <p className="text-xs text-slate-400">Lesson Fee</p>

                        <p className="text-2xl font-black text-blue-600">
                          ₦{booking.amount.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {booking.status === "pending_approval" && (
                      <>
                        <button
                          onClick={() => handleApprove(booking._id)}
                          disabled={actionLoading}
                          className={`bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold transition ${
                            actionLoading ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                        >
                          {actionLoading ? "Processing..." : "Approve Booking"}
                        </button>

                        <button
                          onClick={() => handleReject(booking._id)}
                          disabled={actionLoading}
                          className={`bg-red-100 hover:bg-red-200 text-red-700 px-5 py-3 rounded-xl font-bold transition ${
                            actionLoading ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                        >
                          {actionLoading ? "Processing..." : "Reject"}
                        </button>
                      </>
                    )}

                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => {
                          setLinkModalBooking(booking);
                          setMeetingLink("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition"
                      >
                        Add Meeting Link
                      </button>
                    )}

                    {booking.status === "link_sent" && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-center"
                      >
                        Join Lesson
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {linkModalBooking && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Add Meeting Link
            </h3>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Meeting Link
            </label>

            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setLinkModalBooking(null);
                  setMeetingLink("");
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendMeetingLink}
                disabled={linkSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {linkSubmitting ? "Sending..." : "Send Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
