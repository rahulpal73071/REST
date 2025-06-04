const Authy = require('../models/authy');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await Authy.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already registered, please log in!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Authy({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            message: "Registration successful!", 
            user: { id: newUser._id, name: newUser.name, email: newUser.email } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Log in user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Authy.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ❗ FIXED: token expiry was set to "id" instead of something like "1d"
        const token = jwt.sign(
            { id: user._id, role: user.role || 'user' }, // Assuming 'role' field exists
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
