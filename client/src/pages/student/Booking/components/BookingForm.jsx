export default function BookingForm({ bookingData, setBookingData, tutor }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData({
      ...bookingData,
      [name]: name === "duration" ? Number(value) : value,
    });
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Booking Details
      </h2>

      {/* Subject */}

      <div className="mb-6">
        <label className="block font-semibold mb-2">Subject</label>

        <input
          type="text"
          name="subject"
          value={bookingData.subject}
          onChange={handleChange}
          placeholder="e.g Mathematics"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Course */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Course</label>

        <select
          name="courseId"
          value={bookingData.courseId}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        >
          <option value="">Select a course</option>

          {tutor?.courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name} - ₦{Number(course.pricePerHour).toLocaleString()}/hr
            </option>
          ))}
        </select>
      </div>

      {/* Lesson Type */}

      <div className="mb-6">
        <label className="block font-semibold mb-3">Lesson Type</label>

        <div className="grid grid-cols-3 gap-3">
          {["demo", "trial", "lesson"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setBookingData({
                  ...bookingData,
                  type,
                })
              }
              className={`rounded-xl border p-4 font-semibold capitalize transition
              ${
                bookingData.type === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-300 hover:border-blue-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}

      <div className="mb-6">
        <label className="block font-semibold mb-2">Date</label>

        <input
          type="date"
          name="date"
          value={bookingData.date}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />
      </div>

      {/* Time */}

      <div className="mb-6">
        <label className="block font-semibold mb-2">Time</label>

        <select
          name="time"
          value={bookingData.time}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        >
          <option value="">Select Time</option>
          <option>9:00 AM</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>2:00 PM</option>
          <option>3:00 PM</option>
          <option>4:00 PM</option>
        </select>
      </div>

      {/* Duration */}

      <div className="mb-6">
        <label className="block font-semibold mb-2">Duration</label>

        <select
          name="duration"
          value={bookingData.duration}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        >
          <option value={30}>30 Minutes</option>
          <option value={60}>60 Minutes</option>
          <option value={90}>90 Minutes</option>
          <option value={120}>120 Minutes</option>
        </select>
      </div>

      {/* Notes */}

      <div>
        <label className="block font-semibold mb-2">Notes (Optional)</label>

        <textarea
          rows={5}
          name="notes"
          value={bookingData.notes}
          onChange={handleChange}
          placeholder="Anything you'd like the tutor to know..."
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none"
        />
      </div>
    </div>
  );
}
