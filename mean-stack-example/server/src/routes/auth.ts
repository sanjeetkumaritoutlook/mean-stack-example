import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; // ✅ Correct import
import { User } from "../models/User"; // ✅ Import MongoDB model
const router = Router();
//const users: { username: string; password: string }[] = [];
//more real
//const users: { name: string; email: string; phone: string; username: string; password: string }[] = [];

const JWT_SECRET = "your_secret_key";

// ✅ Register Route (Now Saves to MongoDB)
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
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ msg: "Username or Email already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user to MongoDB
      const newUser = new User({ name, email, phone, username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ msg: "User registered successfully" });
    } catch (error: any) {
      console.error("Error during registration:", error);

      if (error.code === 11000) {
        return res.status(400).json({ msg: "Duplicate username or email" });
      }

      res.status(500).json({ msg: "Internal server error" });
    }
  }
);


// ✅ Login Route (Now Uses MongoDB)
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
      // Fetch user from MongoDB
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // Generate JWT Token
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//Before logging in, you need to create users. -> this will work without directly interacting with mongodb database
//for that used ThunderClient POST to register first user


export default router;
