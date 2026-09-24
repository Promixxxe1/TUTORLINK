import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

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

// Auth APIs
export const authAPI = {
  signup: (data) => api.post("/user/signup", data),
  login: (data) => api.post("/user/login", data),
};

// User APIs
export const userAPI = {
  getAll: () => api.get("/user"),
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
  // Get all bookings for the logged-in user
  getMyBookings: () => api.get("/booking/my-bookings"),

  // Cancel booking
  cancelBooking: (id, reason) =>
    api.put(`/booking/${id}/cancel`, { reason }),

  // Confirm lesson
  confirmLesson: (id) =>
    api.put(`/booking/${id}/confirm`),

  // Submit dispute
  disputeLesson: (id, reason) =>
    api.put(`/booking/${id}/dispute`, { reason }),

  // Submit review
  submitReview: (data) =>
    api.post("/review", data),
};


export default api;
