export default function BookingSummary({
  tutor,
  bookingData,
  onBook,
  loading,
}) {
 const selectedCourse = tutor?.courses?.find(
   (course) => course._id === bookingData.courseId,
 );

 const pricePerHour = selectedCourse?.pricePerHour || 0;

 const total =
   bookingData.duration === 30
     ? pricePerHour * 0.5
     : bookingData.duration === 90
       ? pricePerHour * 1.5
       : bookingData.duration === 120
         ? pricePerHour * 2
         : pricePerHour;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Booking Summary</h2>

      {/* Tutor */}

      <div className="flex items-center gap-4 mb-6">
        <img
          src={tutor?.avatar || `https://i.pravatar.cc/100?u=${tutor?._id}`}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold text-lg">{tutor?.name || "Tutor"}</h3>

          <p className="text-slate-500">Professional Tutor</p>
        </div>
      </div>

      <hr className="mb-6" />

      <div className="flex justify-between">
        <span className="text-slate-500">Course</span>
        <span className="font-semibold">{selectedCourse?.name || "-"}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">Price / Hour</span>
        <span className="font-semibold">₦{pricePerHour.toLocaleString()}</span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-500">Subject</span>
          <span className="font-semibold">{bookingData.subject || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Lesson Type</span>
          <span className="capitalize font-semibold">{bookingData.type}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Date</span>
          <span className="font-semibold">{bookingData.date || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Time</span>
          <span className="font-semibold">{bookingData.time || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Duration</span>
          <span className="font-semibold">{bookingData.duration} mins</span>
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Total</span>

        <span className="text-2xl font-black text-blue-600">
          ₦{total.toLocaleString()}
        </span>
      </div>

      <button
        onClick={onBook}
        disabled={loading}
        className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Booking..." : "Book Lesson"}
      </button>
    </div>
  );
}
