import axios from "axios";
import crypto from "crypto";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import { sendNotificationToUser } from "./notificationController.js";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const paystackHeaders = {
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
};

/*
|--------------------------------------------------------------------------
| Initialize Payment
|--------------------------------------------------------------------------
*/

export const initializePayment = async (req, res) => {
  try {
    const { tutor, courseId, duration, subject, date, time, notes, type } =
      req.body;

    if (!tutor || !courseId || !duration || !subject || !date || !time) {
      return res.status(400).json({
        message:
          "Tutor, course, subject, date, time and duration are required.",
      });
    }

    // Find tutor
    const tutorUser = await userModel.findById(tutor);

    if (!tutorUser) {
      return res.status(404).json({
        message: "Tutor not found.",
      });
    }

    if (tutorUser.role !== "tutor") {
      return res.status(400).json({
        message: "Selected user is not a tutor.",
      });
    }

    // Find selected course
    const selectedCourse = tutorUser.courses?.find(
      (course) => course._id.toString() === courseId.toString(),
    );

    if (!selectedCourse) {
      return res.status(400).json({
        message: "Selected course does not belong to this tutor.",
      });
    }

    // Validate duration
    const lessonDuration = Number(duration);

    if (![30, 60, 90, 120].includes(lessonDuration)) {
      return res.status(400).json({
        message: "Invalid lesson duration.",
      });
    }

    // Calculate amount on the backend
    const pricePerHour = Number(selectedCourse.pricePerHour);
    const amount = (pricePerHour * lessonDuration) / 60;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid course price.",
      });
    }

    // Generate unique reference
    const reference = `TL-${crypto.randomUUID()}`;

    // Initialize Paystack transaction
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email: req.user.email,
        amount: Math.round(amount * 100),
        currency: "NGN",
        reference,
        metadata: {
          studentId: req.user._id.toString(),
          tutorId: tutorUser._id.toString(),
          courseId: selectedCourse._id.toString(),
          courseName: selectedCourse.name,
          duration: lessonDuration,
          subject,
          date,
          time,
          type: type || "lesson",
        },
      },
      {
        headers: paystackHeaders,
      },
    );

    if (!response.data?.status) {
      return res.status(400).json({
        message: "Unable to initialize payment.",
      });
    }

    res.status(200).json({
      message: "Payment initialized successfully.",
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
      reference: response.data.data.reference,
      amount,
    });
  } catch (error) {
    console.error(
      "PAYSTACK INITIALIZATION ERROR:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: error.response?.data?.message || "Failed to initialize payment.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({
        message: "Payment reference is required.",
      });
    }

    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const paymentData = response.data?.data;

    if (!paymentData) {
      return res.status(400).json({
        message: "Payment verification failed.",
      });
    }

    if (paymentData.status !== "success") {
      return res.status(400).json({
        message: "Payment was not successful.",
        status: paymentData.status,
      });
    }
    const metadata = paymentData.metadata;

    if (!metadata) {
      return res.status(400).json({
        message: "Payment metadata is missing.",
      });
    }
    const tutorUser = await userModel.findById(metadata.tutorId);

    if (!tutorUser) {
      return res.status(404).json({
        message: "Tutor not found.",
      });
    }

    const selectedCourse = tutorUser.courses?.find(
      (course) => course._id.toString() === metadata.courseId.toString(),
    );

    if (!selectedCourse) {
      return res.status(400).json({
        message: "Course not found for this tutor.",
      });
    }

    const lessonDuration = Number(metadata.duration);

    const expectedAmount =
      (Number(selectedCourse.pricePerHour) * lessonDuration) / 60;

    const paidAmount = paymentData.amount / 100;

    if (Math.round(paidAmount * 100) !== Math.round(expectedAmount * 100)) {
      return res.status(400).json({
        message: "Payment amount does not match the course price.",
      });
    }
    const existingBooking = await bookingModel.findOne({
      paymentReference: paymentData.reference,
    });

    if (existingBooking) {
      return res.status(200).json({
        message: "Payment already verified and booking already exists.",
        booking: existingBooking,
      });
    }

    const booking = await bookingModel.create({
      student: metadata.studentId,
      tutor: metadata.tutorId,
      courseId: selectedCourse._id,
      courseName: selectedCourse.name,
      subject: metadata.subject,
      date: metadata.date,
      time: metadata.time,
      duration: lessonDuration,
      type: metadata.type || "lesson",
      amount: expectedAmount,
      paymentReference: paymentData.reference,
      status: "pending_approval",
    });

    // notify tutor about successful payment and booking creation
    try {
      await sendNotificationToUser(tutorUser._id, {
        sender: metadata.studentId,
        type: "payment",
        title: "New booking paid",
        body: `A student paid and booked ${selectedCourse.name}.`,
        link: `/tutor/bookings/${booking._id}`,
      });
    } catch (e) {
      console.error("Notify tutor on payment failed", e);
    }

    res.status(200).json({
      message: "Payment verified successfully.",
      payment: {
        reference: paymentData.reference,
        amount: paymentData.amount / 100,
        currency: paymentData.currency,
        status: paymentData.status,
        paidAt: paymentData.paid_at,
      },
    });
  } catch (error) {
    console.error(
      "PAYSTACK VERIFICATION ERROR:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: error.response?.data?.message || "Failed to verify payment.",
    });
  }
};
