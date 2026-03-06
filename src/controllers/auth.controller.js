const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// ================= REGISTER =================
exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, adminCode } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Default role
        let role = "patient";

        // Admin code check (ONLY backend decides)
        if (adminCode && adminCode === process.env.ADMIN_SECRET_CODE) {
            role = "admin";
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
        });

        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: false, // for demo you can keep false
            secure: false, // true only in production https
            sameSite: "lax",
        });
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password required" });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: false, // for demo you can keep false
            secure: false, // true only in production https
            sameSite: "lax",
        });
        res.json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
