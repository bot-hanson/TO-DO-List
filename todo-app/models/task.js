// Task Schema

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // ✅ reference
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    reminder: { type: Date },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", taskSchema);
