import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password must be provided!"],
      trim: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "tutor"],
      default: "student",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      select: false,
    },

    verificationCodeValidation: {
      type: String,
      select: false,
    },

    forgotPasswordCode: {
      type: String,
      select: false,
    },

    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },

    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      messages: {
        type: Boolean,
        default: true,
      },
      bookings: {
        type: Boolean,
        default: true,
      },
      payments: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
