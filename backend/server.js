import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRoutes from "./routes/userRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES (must come first)
app.use(express.json());
app.use(cors());

//Routes...................../
// API routes (after middleware)
app.use("/api/user", userRoutes);
app.use("/api/bookings",  bookingRoutes);
app.use("/api/payments", paymentRoute);
app.use("/api/notifications", notificationRoutes); 

// API endpoints
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
