import axios from "axios";

const API_BASE_URL = "https://tutorlink-y59j.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor to handle expired/invalid tokens
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // clear stored auth and notify app
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("authExpired"));
    }
    return Promise.reject(err);
  },
);

// Auth APIs
export const authAPI = {
  signup: (data) => api.post("/user/signup", data),
  login: (data) => api.post("/user/login", data),
  forgotPassword: (email) => api.post("/user/forgot-password", { email }),
  verifyEmail: (email, code) => api.post("/user/verify-email", { email, code }),
  resetPassword: (email, code, newPassword) =>
    api.post("/user/reset-password", { email, code, newPassword }),
  resendVerification: (email) =>
    api.post("/user/resend-verification", { email }),
};

// User APIs
export const userAPI = {
  getAll: () => api.get("/user"),
  getTutors: () => api.get("/user/tutors"),
  getById: (id) => api.get(`/user/${id}`),
  update: (id, data) => api.put(`/user/${id}`, data),
  delete: (id) => api.delete(`/user/${id}`),

  updateProfile: (data) => api.put("/user/profile", data),

  // 👇 Paste it here
  updateAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return api.put("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  changePassword: (data) => api.put("/user/change-password", data),

  updateNotifications: (data) => api.put("/user/notifications", data),

  deleteAccount: (data) => api.delete("/user/account", { data }),
};

// Booking APIs

export const bookingAPI = {
  createBooking: (data) => api.post("/bookings", data),

  getMyBookings: () => api.get("/bookings/my-bookings"),

  getBookingById: (id) => api.get(`/bookings/${id}`),

  cancelBooking: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),

  confirmLesson: (id) => api.put(`/bookings/${id}/confirm`),

  rateBooking: (id, data) => api.put(`/bookings/${id}/rate`, data),

  disputeLesson: (id, reason) => api.put(`/bookings/${id}/dispute`, { reason }),

  approveBooking: (id) => api.put(`/bookings/${id}/approve`),

  addMeetingLink: (id, meetingLink) =>
    api.put(`/bookings/${id}/meeting-link`, { meetingLink }),
};

// (notifications API removed — student-specific page will use existing endpoints directly)

export const paymentAPI = {
  initializePayment: (data) => api.post("/payments/initialize", data),

  verifyPayment: (reference) => api.get(`/payments/verify/${reference}`),
};

export default api;
