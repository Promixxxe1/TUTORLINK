import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

// Signup - Create a new user with password hashing
export const signup = async (req, res) => {
  try {
    console.log("🔵 SIGNUP ENDPOINT CALLED"); // Debug
    console.log("Request body:", req.body); // Debug

    const { name, email, password, role, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash password
    console.log("🔐 Hashing password with bcrypt..."); // Debug
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed:", hashedPassword); // Debug

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      address: address || "",
    });

    await newUser.save();
    console.log("✅ User saved to DB:", newUser); // Debug

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bio: newUser.bio,
        avatar: newUser.avatar,
        notifications: newUser.notifications,
      },
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

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email and include password field
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
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

// Create a new user (legacy - for other purposes)
export const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const { email } = newUser;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
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
      { new: true },
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

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "TutorLink/avatars",
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        avatar: result.secure_url,
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
    res.status(500).json({
      message: error.message,
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