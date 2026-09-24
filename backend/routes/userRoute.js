import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  forgotPassword,
  verifyEmail,
  resetPassword,
  resendVerification,
  createUser,
  getAllUsers,
  getUserById,
  getTutors,
  uploadAvatar,
  updateProfile,
  deleteUserById,
  changePassword,
  updateNotifications,
  deleteAccount,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/resend-verification", resendVerification);

// User CRUD routes
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/tutors", getTutors);

// Protected routes
router.put("/profile", protect, updateProfile);

router.put("/avatar", protect, upload.single("avatar"), uploadAvatar);

router.put("/change-password", protect, changePassword);

router.put("/notifications", protect, updateNotifications);

router.delete("/account", protect, deleteAccount);

// Dynamic routes LAST
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

export default router;

//sign up router......................
