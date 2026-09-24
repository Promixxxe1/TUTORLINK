import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  initializePayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Initialize Paystack payment
router.post("/initialize", protect, initializePayment);

// Verify Paystack payment
router.get("/verify/:reference", protect, verifyPayment);

export default router;
