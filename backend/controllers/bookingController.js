import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import { sendNotificationToUser } from "./notificationController.js";

/*
|--------------------------------------------------------------------------
| Create Booking
|--------------------------------------------------------------------------
*/

export const createBooking = async (req, res) => {
  try {
    if (req.body.tutor === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot book yourself.",
      });
    }

    const tutor = await userModel.findById(req.body.tutor);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found.",
      });
    }

    if (tutor.role !== "tutor") {
      return res.status(400).json({
        message: "Selected user is not a tutor.",
      });
    }

    const { courseId, duration } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "Please select a course.",
      });
    }

    const selectedCourse = tutor.courses?.find(
      (course) => course._id.toString() === courseId.toString(),
    );

    if (!selectedCourse) {
      return res.status(400).json({
        message: "Selected course does not belong to this tutor.",
      });
    }

    const lessonDuration = Number(duration);

    if (![30, 60, 90, 120].includes(lessonDuration)) {
      return res.status(400).json({
        message: "Invalid lesson duration.",
      });
    }

    const pricePerHour = Number(selectedCourse.pricePerHour);

    const amount = (pricePerHour * lessonDuration) / 60;

    const booking = await bookingModel.create({
      ...req.body,
      tutor: tutor._id,
      student: req.user._id,
      courseId: selectedCourse._id,
      courseName: selectedCourse.name,
      amount,
      status: "pending_approval",
    });

    // notify tutor
    try {
      await sendNotificationToUser(tutor._id, {
        sender: req.user._id,
        type: "booking",
        title: "New booking request",
        body: `${req.user.name} requested a booking for ${selectedCourse.name}`,
        link: `/tutor/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify tutor failed", e);
    }

    res.status(201).json({
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get My Bookings
|--------------------------------------------------------------------------
*/

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({
        $or: [{ student: req.user._id }, { tutor: req.user._id }],
      })
      .populate("student", "name email avatar")
      .populate("tutor", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Booking
|--------------------------------------------------------------------------
*/

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel
      .findOne({
        _id: req.params.id,
        $or: [{ student: req.user._id }, { tutor: req.user._id }],
      })
      .populate("student", "name email avatar")
      .populate("tutor", "name email avatar");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.json({
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Approve Booking
|--------------------------------------------------------------------------
*/

export const approveBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    console.log("BOOKING TUTOR:", booking?.tutor);
    console.log("LOGGED IN USER:", req.user._id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Only the tutor who owns the booking can approve it
    if (booking.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the assigned tutor can approve this booking.",
      });
    }

    if (booking.status !== "pending_approval") {
      return res.status(400).json({
        message: "This booking is not waiting for approval.",
      });
    }

    booking.status = "confirmed";

    await booking.save();

    // notify student
    try {
      await sendNotificationToUser(booking.student, {
        sender: req.user._id,
        type: "booking",
        title: "Booking approved",
        body: `Your booking has been approved by the tutor.`,
        link: `/student/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify student failed", e);
    }

    res.json({
      message: "Booking approved successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Add Meeting Link
|--------------------------------------------------------------------------
*/

export const addMeetingLink = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Only the tutor can add the meeting link
    if (booking.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the assigned tutor can add the meeting link.",
      });
    }

    if (!["confirmed", "awaiting_link"].includes(booking.status)) {
      return res.status(400).json({
        message: "A meeting link cannot be added at this stage.",
      });
    }

    const { meetingLink } = req.body;

    if (!meetingLink || !meetingLink.trim()) {
      return res.status(400).json({
        message: "Meeting link is required.",
      });
    }

    booking.meetingLink = meetingLink.trim();
    booking.status = "link_sent";

    await booking.save();

    // notify student
    try {
      await sendNotificationToUser(booking.student, {
        sender: req.user._id,
        type: "meeting",
        title: "Meeting link added",
        body: `Your tutor added a meeting link for the upcoming lesson.`,
        link: `/student/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify student failed", e);
    }

    res.json({
      message: "Meeting link added successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Mark Lesson As Awaiting Confirmation
|--------------------------------------------------------------------------
*/

export const startLesson = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Only the tutor can start the lesson
    if (booking.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the assigned tutor can start this lesson.",
      });
    }

    if (booking.status !== "link_sent") {
      return res.status(400).json({
        message: "This lesson is not ready to be started.",
      });
    }

    booking.status = "awaiting_confirmation";

    await booking.save();

    res.json({
      message: "Lesson started successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Cancel Booking
|--------------------------------------------------------------------------
*/

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findOne({
      _id: req.params.id,
      $or: [{ student: req.user._id }, { tutor: req.user._id }],
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Don't allow cancelling completed or already cancelled bookings
    if (["completed", "cancelled"].includes(booking.status)) {
      return res.status(400).json({
        message: "This booking cannot be cancelled.",
      });
    }

    booking.status = "cancelled";
    booking.cancellationReason = req.body.reason || "";

    await booking.save();

    res.json({
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Confirm Lesson
|--------------------------------------------------------------------------
*/

export const confirmLesson = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }
    if (booking.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the student can confirm this lesson.",
      });
    }
    if (!["link_sent", "awaiting_confirmation"].includes(booking.status)) {
      return res.status(400).json({
        message: "This booking cannot be confirmed.",
      });
    }

    booking.status = "completed";

    await booking.save();

    // notify tutor that student confirmed lesson
    try {
      await sendNotificationToUser(booking.tutor, {
        sender: req.user._id,
        type: "booking",
        title: "Lesson confirmed by student",
        body: `Student confirmed the lesson as completed.`,
        link: `/tutor/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify tutor failed", e);
    }

    res.json({
      message: "Lesson confirmed.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Rate Lesson
|--------------------------------------------------------------------------
*/

export const rateBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    if (booking.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the student can rate this lesson.",
      });
    }

    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "Only completed lessons can be rated.",
      });
    }

    const rating = Number(req.body.rating);
    const comment = (req.body.comment || "").trim();

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    if (!comment) {
      return res.status(400).json({
        message: "Please write a short review before sending.",
      });
    }

    booking.rating = rating;
    booking.reviewComment = comment;
    booking.isReviewed = true;
    booking.reviewCreatedAt = new Date();

    await booking.save();

    // notify tutor about new review
    try {
      await sendNotificationToUser(booking.tutor, {
        sender: booking.student,
        type: "review",
        title: "New review received",
        body: `You received a ${booking.rating}-star review.`,
        link: `/tutor/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify tutor review failed", e);
    }

    res.json({
      message: "Lesson rated successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Dispute Lesson
|--------------------------------------------------------------------------
*/

export const disputeLesson = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }
    if (booking.status !== "awaiting_confirmation") {
      return res.status(400).json({
        message: "Only lessons awaiting confirmation can be disputed.",
      });
    }
    if (booking.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the student can dispute this lesson.",
      });
    }

    booking.status = "disputed";
    booking.disputeReason = req.body.reason;

    await booking.save();

    res.json({
      message: "Dispute submitted successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
