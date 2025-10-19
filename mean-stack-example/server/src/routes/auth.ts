import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { getCollection } from "../models/User"; 

dotenv.config();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";;
console.log("🔑 Using JWT_SECRET:", JWT_SECRET);

// ✅ Register User (Using `users` collection)
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email format"),
        body("phone").isLength({ min: 10, max: 15 }).withMessage("Phone number must be 10-15 digits"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, phone, username, password } = req.body;

        try {
            const usersCollection = getCollection("users");

            // Check if user already exists
            const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ msg: "Username or Email already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Save user to MongoDB
            await usersCollection.insertOne({ name, email, phone, username, password: hashedPassword });

            res.status(201).json({ msg: "User registered successfully" });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }
);

// ✅ Login User (Using `users` collection)
router.post(
    "/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, password } = req.body;

        try {
            const usersCollection = getCollection("users");

            // Find user in MongoDB
            const user = await usersCollection.findOne({ username });
            if (!user) return res.status(400).json({ msg: "Invalid credentials" });

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            // Generate JWT token
            const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server error" });
        }
    }
);


export default router;
