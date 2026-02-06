const express = require("express");
const User = require("../models/User"); // assuming User schema is in Task.js
const router = express.Router();

// Add a task
router.post("/", async (req, res) => {
    const { title, date, category } = req.body;
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.tasks.push({ title, date, category, completed: false });
        await user.save();

        res.json({ message: "Task added successfully!", tasks: user.tasks });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get tasks
router.get("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Mark task as complete
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const task = user.tasks.id(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.completed = true;
        await user.save();

        res.json({ message: "Task marked as complete", task });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const task = user.tasks.id(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        user.tasks.pull({ _id: id });
        await user.save();

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;