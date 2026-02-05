// 1. Imports
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 2. Middleware to read JSON data
app.use(express.json());

// 3. MongoDB connection
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const express = require('express');
const app = express();

// 4. Define Models
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [
        {
            title: String,
            date: String,
            category: String,
            completed: { type: Boolean, default: false }
        }
    ]
});
const User = mongoose.model("User", userSchema);


// 5. Routes
// i. Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const user = new User({ email, password, tasks: [] });
        await user.save();
        res.json({ message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ii. Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// iii. Add a task
app.post('/tasks', async (req, res) => {
    const { email, title, date, category } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.tasks.push({ title, date, category });
        await user.save();

        res.json({ message: "Task added successfully!", tasks: user.tasks });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// iv. Get tasks
app.get('/tasks/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// v. Mark task as complete
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = true;
    res.json({ message: "Task marked as complete", task });
});

// vi. Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) return res.status(404).json({ message: "Task not found" });

    tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
});

// vii. Add a new task for a user
app.post('/tasks', (req, res) => {
    const { email, title, date, category } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newTask = {
        id: user.tasks.length + 1,
        title,
        date,
        category,
        completed: false
    };

    user.tasks.push(newTask);
    res.json({ message: "Task added successfully!", task: newTask });
});

// viii. Get all tasks for a user
app.get('/tasks/:email', (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.tasks);
});

// ix. Mark a task as complete
app.put('/tasks/:email/:id', (req, res) => {
    const { email, id } = req.params;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.find(t => t.id === parseInt(id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = true;
    res.json({ message: "Task marked as complete", task });
});


// x. Delete a task
app.delete('/tasks/:email/:id', (req, res) => {
    const { email, id } = req.params;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Task not found" });

    user.tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
});

