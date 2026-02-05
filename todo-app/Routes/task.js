// 5. Routes


// i. Signup

const nodemailer = require('nodemailer');

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, isVerified: false });
        await user.save();

        // Create verification token (expires in 1 day)
        const verifyToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1d" });

        // Setup mail transporter (use Mailtrap or Gmail for dev)
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f9942bce1874df",
                pass: "d5b48a36f2a617"
            }
        });

        transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP error:", error);
            } else {
                console.log("SMTP connection successful!");
            }
        });



        const mailOptions = {
            from: "yourEmail@gmail.com",
            to: user.email,
            subject: "Verify your account",
            text: `Click this link to verify your account: http://localhost:5000/verify/${verifyToken}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Signup successful! Please check your email to verify your account." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


// i-a. Verify route

app.get('/verify/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // i-b. Verification check

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        user.isVerified = true;
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired verification link" });
    }
});

// ii. Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Access token (short-lived)

        const accessToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });

        // Refresh token (long-lived)

        const refreshToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful!",
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

//Password Reset

// Forgot Password

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Create reset token (expires in 15 minutes)
        const resetToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: "15m" });

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f9942bce1874df",   // your Mailtrap user
                pass: "d5b48a36f2a617"    // your Mailtrap pass
            }
        });


        const mailOptions = {
            from: "yourEmail@gmail.com",
            to: user.email,
            subject: "Password Reset",
            text: `Click this link to reset your password: http://localhost:5000/reset-password/${resetToken}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset email sent. Please check your inbox." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Reset password

app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful! You can now log in with your new password." });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired reset link" });
    }
});

// ii-a. refresh token and issues a new access token

app.post('/refresh', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    try {
        const decoded = jwt.verify(token, SECRET);
        const newAccessToken = jwt.sign({ email: decoded.email }, SECRET, { expiresIn: "1h" });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});


// iii. Add a task

app.post('/tasks', authMiddleware, async (req, res) => {
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

// iv. Get tasks

app.get('/tasks', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// v. Mark task as complete

app.put('/tasks/:id', authMiddleware, async (req, res) => {
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

// vi. Delete a task

app.delete('/tasks/:id', authMiddleware, async (req, res) => {
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