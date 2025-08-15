const express = require("express");
const { AuthModel } = require("../model/auth");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../model/blackListToken");
const authMiddleware = require("../middleWare");


authRouter.post("/register", async (req, res) => {
  
  try {
      const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "Email and password are required" });
    }
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists, please login" });
    }
       const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new AuthModel({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ msg: "New user has been registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found, please register" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send success response
    res.status(200).json({ msg: "Login successful", user: payload });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});


authRouter.get("/logout", async (req, res) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ msg: "No token found" });
    }

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ msg: "Invalid token format" });
    }

    const expiresAt = new Date(decoded.exp * 1000);
    await BlacklistedToken.create({ token, expiresAt });

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ msg: "Logout failed" });
  }
});
authRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await AuthModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});



module.exports = { authRouter };
