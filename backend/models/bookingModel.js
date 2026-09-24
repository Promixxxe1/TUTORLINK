import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
    },
    paymentReference: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["demo", "trial", "lesson"],
      default: "lesson",
    },

    status: {
      type: String,
      enum: [
        "pending_payment",
        "pending_approval",
        "confirmed",
        "awaiting_link",
        "link_sent",
        "awaiting_confirmation",
        "completed",
        "cancelled",
        "refunded",
        "disputed",
      ],
      default: "pending_payment",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    cancellationReason: {
      type: String,
      default: "",
    },

    disputeReason: {
      type: String,
      default: "",
    },

    isReviewed: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    reviewComment: {
      type: String,
      default: "",
    },

    reviewCreatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", bookingSchema);
