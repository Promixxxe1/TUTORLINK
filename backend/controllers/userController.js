import crypto from "crypto";
import emailService from "../utils/emailService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import { promisify } from "util";

// Signup - Create a new user with password hashing
export const signup = async (req, res) => {
  try {
    console.log("🔵 SIGNUP ENDPOINT CALLED"); // Debug
    console.log("Request body:", req.body); // Debug

    const { name, email, password, role, address } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    // Validate required fields
    if (!name || !normalizedEmail || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      const existingMessage =
        "An account with this email already exists. Please proceed to login.";

      return res.status(409).json({
        message: existingMessage,
        emailExists: true,
        requiresLogin: true,
        requiresVerification: existingUser.verified === false,
        email: existingUser.email,
      });
    }

    // Hash password
    console.log("🔐 Hashing password with bcrypt..."); // Debug
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed:", hashedPassword); // Debug

    // Create new user
    const newUser = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "student",
      address: address || "",
    });

    // Generate email verification code and expiry (6 digits)
    const verificationCode = crypto.randomInt(100000, 1000000).toString();
    // hash the code before storing
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(verificationCode, salt);
    newUser.verificationCode = hashed;
    newUser.verificationCodeValidation = Date.now() + 10 * 60 * 1000; // 10 minutes
    newUser.verificationCodeSentAt = Date.now();

    await newUser.save();
    console.log("✅ User saved to DB:", newUser); // Debug

    // Send verification email (best-effort)
    try {
      // Use emailService which prefers HTTPS API when configured
      await emailService.sendVerificationEmail(
        newUser.email,
        verificationCode,
        newUser.name,
      );
    } catch (err) {
      console.error("Failed to send verification email:", err?.message || err);
      // rollback verification fields so user can retry
      newUser.verificationCode = undefined;
      newUser.verificationCodeValidation = undefined;
      newUser.verificationCodeSentAt = undefined;
      await newUser.save();
      return res.status(502).json({
        message:
          "Failed to deliver verification email. Please try again later.",
      });
    }

    res.status(201).json({
      message:
        "Account created. Please verify your email address using the code sent to your inbox before you can log in.",
      verified: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
};

// Login - Authenticate user and return token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    // Validate required fields
    if (!normalizedEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email and include password field
    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select("+password +verified");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // Generate JWT tokennpm
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatar: user.avatar,
        notifications: user.notifications,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

// Forgot Password - Send reset code to user's email
export const forgotPassword = async (req, res) => {
  try {
    console.log("FORGOT PASSWORD CONTROLLER REACHED");
    const { email } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select("+forgotPasswordCode +forgotPasswordCodeValidation +verified");

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before requesting a password reset.",
      });
    }

    // Generate a 6-digit reset code
    const resetCode = crypto.randomInt(100000, 1000000).toString();

    // Save reset code
    user.forgotPasswordCode = resetCode;

    // Code expires after 10 minutes
    user.forgotPasswordCodeValidation = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Send reset code by email via Resend
    await emailService.sendPasswordResetEmail(user.email, resetCode, user.name);

    res.status(200).json({
      message: "Password reset code sent to your email.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Failed to send password reset code.",
      error: error.message,
    });
  }
};

// Resend verification code
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    if (!normalizedEmail)
      return res.status(400).json({ message: "Email required" });

    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select(
        "+verificationCode +verificationCodeValidation +verified +verificationCodeSentAt",
      );

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.verified)
      return res.status(400).json({ message: "User already verified" });
    // Enforce a 60s cooldown between resends
    const now = Date.now();
    if (
      user.verificationCodeSentAt &&
      now - user.verificationCodeSentAt < 60 * 1000
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting another code" });
    }

    const verificationCode = crypto.randomInt(100000, 1000000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(verificationCode, salt);
    user.verificationCode = hashed;
    user.verificationCodeValidation = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.verificationCodeSentAt = Date.now();

    await user.save();

    try {
      await emailService.sendVerificationEmail(
        user.email,
        verificationCode,
        user.name,
      );
    } catch (err) {
      console.error(
        "Failed to resend verification email:",
        err?.message || err,
      );
      // Do not leave old code invalidated if send failed — keep previous valid code
      return res.status(502).json({
        message:
          "Failed to deliver verification email. Please try again later.",
      });
    }

    return res.status(200).json({ message: "Verification code resent" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify email code
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select(
        "+verificationCode +verificationCodeValidation +verified +verificationCodeSentAt",
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Compare hashed code
    const valid = await bcrypt.compare(code, user.verificationCode || "");
    if (!valid)
      return res.status(400).json({ message: "Invalid verification code" });

    if (Date.now() > Number(user.verificationCodeValidation)) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    user.verified = true;
    user.verificationCode = null;
    user.verificationCodeValidation = null;
    user.verificationCodeSentAt = null;

    await user.save();

    // generate token and return user for convenience
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reset password using code
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, code and new password are required" });
    }

    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select("+forgotPasswordCode +forgotPasswordCodeValidation +password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.forgotPasswordCode !== code) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    if (Date.now() > Number(user.forgotPasswordCodeValidation)) {
      return res.status(400).json({ message: "Reset code expired" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.forgotPasswordCode = null;
    user.forgotPasswordCodeValidation = null;

    await user.save();

    // Optionally generate a token so user can be logged in immediately
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Password reset successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new user (legacy - for other purposes)
export const createUser = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      email: String(req.body?.email || "")
        .trim()
        .toLowerCase(),
    };
    const newUser = new userModel(payload);
    const { email } = newUser;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "An account with this email already exists. Please proceed to login.",
        emailExists: true,
        requiresLogin: true,
        requiresVerification: !existingUser.verified,
        email: existingUser.email,
      });
    }

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find({});
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res
      .status(200)
      .json({ message: "Users fetched successfully", users: userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Fetch a single user by ID
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User fetched successfully", user: userExist });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update a user by ID/////////////////

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        courses: updatedUser.courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};

//uplaod avatar+____________________________

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const missingCloudinaryConfig =
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET;

    if (missingCloudinaryConfig) {
      return res.status(500).json({
        message:
          "Cloudinary is not configured on the server. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "TutorLink/avatars",
          transformation: [{ format: "webp", quality: "auto" }],
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        avatar: uploadResult.secure_url,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Avatar updated successfully",
      avatar: updatedUser.avatar,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
   console.error("Avatar upload failed:", {
     message: error.message,
     http_code: error.http_code,
     name: error.name,
     stack: error.stack,
   });
    res.status(500).json({
      message: error.message || "Avatar upload failed",
    });
  }
};

// Delete a user by ID................
export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

//change passworid...............
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateNotifications = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        notifications: req.body,
      },
      {
        new: true,
      },
    );

    res.json({
      message: "Notification settings updated.",
      notifications: user.notifications,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//account deletion________________
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    const user = await userModel.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Tutors
|--------------------------------------------------------------------------
*/

export const getTutors = async (req, res) => {
  try {
    const tutors = await userModel
      .find({ role: "tutor" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      tutors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
