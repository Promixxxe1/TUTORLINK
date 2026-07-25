import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES (must come first)
app.use(express.json());
app.use(cors());


//Routes...................../
// API routes (after middleware)
app.use("/api/user", userRoutes);


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
