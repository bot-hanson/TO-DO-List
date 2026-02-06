const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/task");
const categoryRouter = require("./routes/categories");


const app = express();              // ✅ define app first
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Auth middleware
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        console.log("Token received:", token);
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
}

// ✅ Mount routes AFTER app is defined
app.use("/", authRouter);
app.use("/tasks", authMiddleware, tasksRouter);
app.use("/categories", authMiddleware, categoryRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));