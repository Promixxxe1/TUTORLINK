import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  confirmLesson,
  rateBooking,
  disputeLesson,
  approveBooking,
  addMeetingLink,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create booking
router.post("/", protect, createBooking);

// Get all bookings for logged in user
router.get("/my-bookings", protect, getMyBookings);

// Get single booking
router.get("/:id", protect, getBookingById);

// Approve booking (for tutors)
router.put("/:id/approve", protect, approveBooking);

// Add meeting link
router.put("/:id/meeting-link", protect, addMeetingLink);

// Cancel booking
router.put("/:id/cancel", protect, cancelBooking);

// Confirm lesson
router.put("/:id/confirm", protect, confirmLesson);

// Rate lesson
router.put("/:id/rate", protect, rateBooking);

// Dispute lesson
router.put("/:id/dispute", protect, disputeLesson);

export default router;
