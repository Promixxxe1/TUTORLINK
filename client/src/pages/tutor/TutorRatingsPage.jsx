import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { bookingAPI } from "../../services/api";
import { getAvatarUrl } from "../../types";

export default function TutorRatingsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await bookingAPI.getMyBookings();
        const tutorBookings = (res.data?.bookings || []).filter((booking) => {
          const tutorId = booking.tutor?._id || booking.tutor;
          const userId = user?.id || user?._id;
          return tutorId && userId && tutorId.toString() === userId.toString();
        });

        const derivedReviews = tutorBookings
          .filter(
            (booking) => booking.isReviewed && Number(booking.rating) >= 1,
          )
          .map((booking) => ({
            _id: booking._id,
            name: booking.student?.name || "Student",
            email: booking.student?.email || "",
            avatar: booking.student?.avatar || null,
            subject: booking.subject || "Lesson",
            createdAt:
              booking.reviewCreatedAt || booking.updatedAt || booking.date,
            rating: Number(booking.rating || 0),
            comment: booking.reviewComment || "",
            isAnonymous: false,
          }));

        setReviews(derivedReviews);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    const percentage =
      reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    return { stars, count, percentage };
  });

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="max-w-4xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Ratings & Reviews
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          See what your students say about you
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="text-center md:text-left">
            <p className="text-7xl font-black text-slate-900">{avgRating}</p>
            <div className="flex items-center gap-1 justify-center md:justify-start mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${index < Math.round(Number(avgRating)) ? "text-yellow-500" : "text-slate-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-1">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex-1 space-y-2 w-full">
            {breakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 w-4">
                  {item.stars}
                </span>
                <span className="text-yellow-500 text-[14px]">★</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl h-28 animate-pulse border border-slate-200"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <span className="block text-6xl mb-4">⭐</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-slate-500 text-sm">
            Reviews will appear here after students rate your lessons.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      getAvatarUrl({
                        _id: review._id,
                        avatar: review.avatar,
                        email: review.email,
                      }) || `https://i.pravatar.cc/40?u=${review._id}`
                    }
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {review.subject} •{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-[16px] ${index < review.rating ? "text-yellow-500" : "text-slate-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
