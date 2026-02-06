
// User Schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    tasks: [
        {
            title: { type: String, required: true },
            date: { type: String },
            category: { type: String },
            completed: { type: Boolean, default: false }
        }
    ]
});

module.exports = mongoose.model("User", userSchema);