const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User"); // ✅ use User schema, not Task; // assuming User schema is in Task.js

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, isVerified: false });
        await user.save();

        const verifyToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: { user: "f9942bce1874df", pass: "d5b48a36f2a617" }
        });

        await transporter.sendMail({
            from: "yourEmail@gmail.com",
            to: user.email,
            subject: "Verify your account",
            text: `Click this link to verify your account: http://localhost:5000/verify/${verifyToken}`
        });

        res.json({ message: "Signup successful! Please check your email to verify your account." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Verify
router.get("/verify/:token", async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isVerified = true;
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired verification link" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful!", accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: { user: "f9942bce1874df", pass: "d5b48a36f2a617" }
        });

        await transporter.sendMail({
            from: "yourEmail@gmail.com",
            to: user.email,
            subject: "Password Reset",
            text: `Click this link to reset your password: http://localhost:5000/reset-password/${resetToken}`
        });

        res.json({ message: "Password reset email sent. Please check your inbox." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password reset successful! You can now log in with your new password." });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired reset link" });
    }
});

// Refresh Token
router.post("/refresh", async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

module.exports = router;