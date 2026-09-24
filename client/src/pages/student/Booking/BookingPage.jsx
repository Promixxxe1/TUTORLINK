import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { userAPI, bookingAPI, paymentAPI } from "../../../services/api";
import { toast } from "react-toastify";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import Paystack from "@paystack/inline-js";

export default function BookingPage() {
  const navigate = useNavigate();
  const { tutorId } = useParams();
  const [searchParams] = useSearchParams();
  const [bookingLoading, setBookingLoading] = useState(false);

  // Temporary tutor (we'll fetch the real tutor later)
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await userAPI.getById(tutorId);

        setTutor(res.data.user);
        console.log("URL TUTOR ID:", tutorId);
        console.log("FETCHED TUTOR:", res.data.user);

        setTutor(res.data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load tutor.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) return;

      try {
        setBookingLoading(true);

        const response = await paymentAPI.verifyPayment(reference);

        toast.success(
          response.data?.message || "Payment verified successfully!",
        );

        navigate("/student/bookings", { replace: true });
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Payment verification failed.",
        );
      } finally {
        setBookingLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  const handleBooking = async () => {
    if (!bookingData.subject.trim()) {
      return toast.error("Please enter a subject.");
    }

    if (!bookingData.date) {
      return toast.error("Please select a date.");
    }

    if (!bookingData.time) {
      return toast.error("Please select a time.");
    }

    if (!bookingData.duration) {
      return toast.error("Please select a duration.");
    }

    if (!tutor) {
      return toast.error("Tutor not found.");
    }

    try {
      setBookingLoading(true);

      const paymentResponse = await paymentAPI.initializePayment({
        tutor: tutor._id,
        courseId: bookingData.courseId,
        duration: bookingData.duration,
        subject: bookingData.subject,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.notes,
        type: bookingData.type,
      });

      const { accessCode } = paymentResponse.data;

      const popup = new Paystack();

      popup.resumeTransaction(accessCode, {
        onSuccess: async (transaction) => {
          try {
            setBookingLoading(true);

            await paymentAPI.verifyPayment(transaction.reference);

            toast.success("Payment successful! Booking created.");

            navigate("/student/bookings", { replace: true });
          } catch (err) {
            toast.error(
              err.response?.data?.message || "Payment verification failed.",
            );
          } finally {
            setBookingLoading(false);
          }
        },

        onCancel: () => {
          toast.info("Payment cancelled.");
          setBookingLoading(false);
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Payment initialization failed.",
      );
    } finally {
      setBookingLoading(false);
    }
  };
  const [bookingData, setBookingData] = useState({
    subject: "",
    type: "lesson",
    date: "",
    time: "",
    duration: 60,
    notes: "",
    amount: 0,
    courseId: "",
  });
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading tutor...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">Book a Lesson</h1>

          <p className="text-slate-500 mt-2">
            Complete the details below to schedule your lesson.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm
              bookingData={bookingData}
              setBookingData={setBookingData}
              tutor={tutor}
            />
          </div>

          <div>
            <BookingSummary
              tutor={tutor}
              bookingData={bookingData}
              onBook={handleBooking}
              loading={bookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
