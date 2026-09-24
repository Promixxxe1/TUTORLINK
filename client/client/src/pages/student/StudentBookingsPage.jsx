import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
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


  const { user } = useAuth();
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
                  <a
                    href={booking.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Join Lesson
                  </a>
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
                    onClick={() => setCancelModal(booking)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

                {booking.status === "completed" && !booking.isReviewed && (
                  <button
                    onClick={() => setReviewModal(booking)}
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
  </div>
);
}

