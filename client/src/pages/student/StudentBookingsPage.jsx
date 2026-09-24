import { useEffect, useState } from "react";
import { bookingAPI } from "../../services/api";
import { toast } from "react-toastify";

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  awaiting_link: "bg-blue-100 text-blue-700",
  link_sent: "bg-indigo-100 text-indigo-700",
  awaiting_confirmation: "bg-yellow-100 text-yellow-800",
  disputed: "bg-red-100 text-red-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
  pending_payment: "bg-orange-100 text-orange-700",
  pending_approval: "bg-yellow-100 text-yellow-700",
  refunded: "bg-gray-100 text-gray-700",
};

const filters = ["All", "Upcoming", "Completed", "Cancelled"];

export default function StudentBookingsPage() {
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  const [filter, setFilter] = useState("All");

  const [cancelModal, setCancelModal] = useState(null);

  const [reviewModal, setReviewModal] = useState(null);

  const [disputeModal, setDisputeModal] = useState(null);

  const [cancelReason, setCancelReason] = useState("");

  const [disputeReason, setDisputeReason] = useState("");

  const [stars, setStars] = useState(0);

  const [comment, setComment] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [joinedLessons, setJoinedLessons] = useState({});

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await bookingAPI.getMyBookings();

      setBookings(res.data.bookings);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      setActionLoading(true);
      await bookingAPI.cancelBooking(bookingId, "Cancelled by student");
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );
      toast.success("Booking cancelled successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirm = async (bookingId) => {
    try {
      setActionLoading(true);
      await bookingAPI.confirmLesson(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "completed" }
            : booking,
        ),
      );
      toast.success("Booking confirmed successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to confirm booking.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleJoinLesson = (booking) => {
    if (!booking.meetingLink) {
      toast.error("No meeting link is available yet.");
      return;
    }

    window.open(booking.meetingLink, "_blank", "noopener,noreferrer");
    setJoinedLessons((prev) => ({ ...prev, [booking._id]: true }));
  };

  const handleRateSubmit = async (event) => {
    event.preventDefault();

    if (!reviewModal) return;

    if (stars < 1) {
      toast.error("Please choose a star rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a short review before sending.");
      return;
    }

    try {
      setActionLoading(true);
      await bookingAPI.rateBooking(reviewModal._id, {
        rating: stars,
        comment: comment.trim(),
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === reviewModal._id
            ? {
                ...booking,
                isReviewed: true,
                rating: stars,
                reviewComment: comment.trim(),
              }
            : booking,
        ),
      );

      toast.success("Thanks for your rating!");
      setReviewModal(null);
      setStars(0);
      setComment("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to submit your rating.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "Upcoming") {
      return [
        "confirmed",
        "awaiting_link",
        "link_sent",
        "pending_payment",
        "pending_approval",
        "awaiting_confirmation",
      ].includes(booking.status);
    }

    if (filter === "Completed") {
      return booking.status === "completed";
    }

    if (filter === "Cancelled") {
      return ["cancelled", "refunded"].includes(booking.status);
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800">My Bookings</h1>

        <p className="text-slate-500">{bookings.length} booking(s)</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-full transition

${
  filter === item
    ? "bg-blue-600 text-white"
    : "bg-white border border-slate-300"
}`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h3 className="text-xl font-bold">No bookings found</h3>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow border p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${statusColors[booking.status]}`}
                  >
                    {booking.status.replaceAll("_", " ")}
                  </span>

                  <h2 className="text-xl font-bold mt-3">{booking.subject}</h2>

                  <p className="text-slate-500">
                    {booking.date}

                    {" • "}

                    {booking.time}
                  </p>

                  <p className="text-slate-500 mt-1">
                    Duration: {booking.duration} mins
                  </p>

                  {booking.amount > 0 && (
                    <p className="font-bold mt-2">
                      ₦{booking.amount.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {booking.status === "link_sent" && (
                    <>
                      <button
                        onClick={() => handleJoinLesson(booking)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Join Lesson
                      </button>

                      {joinedLessons[booking._id] && (
                        <button
                          onClick={() => handleConfirm(booking._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Mark as Completed
                        </button>
                      )}
                    </>
                  )}

                  {booking.status === "awaiting_confirmation" && (
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Confirm
                    </button>
                  )}

                  {[
                    "confirmed",
                    "awaiting_link",
                    "pending_payment",
                    "pending_approval",
                  ].includes(booking.status) && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={actionLoading}
                      className={`bg-red-600 text-white px-4 py-2 rounded-lg ${
                        actionLoading ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {actionLoading ? "Processing..." : "Cancel"}
                    </button>
                  )}

                  {booking.status === "completed" && !booking.isReviewed && (
                    <button
                      onClick={() => {
                        setReviewModal(booking);
                        setStars(0);
                        setComment("");
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      Rate Lesson
                    </button>
                  )}

                  {booking.status === "awaiting_confirmation" && (
                    <button
                      onClick={() => setDisputeModal(booking)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    >
                      Dispute
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Rate your lesson
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {reviewModal.subject}
                </p>
              </div>

              <button
                onClick={() => {
                  setReviewModal(null);
                  setStars(0);
                  setComment("");
                }}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRateSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your rating
                </label>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    const active = value <= stars;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setStars(value)}
                        className={`text-3xl transition ${active ? "text-yellow-500" : "text-slate-300"}`}
                        aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Review
                </label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={5}
                  placeholder="Tell your tutor how the lesson went..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-slate-700 focus:ring-2 focus:ring-blue-300 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReviewModal(null);
                    setStars(0);
                    setComment("");
                  }}
                  className="flex-1 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-60"
                >
                  {actionLoading ? "Sending..." : "Send Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
