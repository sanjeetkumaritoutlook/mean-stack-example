//import mongoose from "mongoose";
//Instead of using Mongoose, let's use the MongoDB Native Driver.
// This means no schemas, but you get direct control over MongoDB operations.
//modify User.ts to allow switching between different collections dynamically based on the request type (e.g., users for authentication, employees for employee management).

//✅ Ensures MongoDB is connected before accessing collections


// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export const User = mongoose.model("User", UserSchema);

import { MongoClient, Db, Collection } from "mongodb";

// MongoDB connection URI (Use from .env if needed)
const MONGO_URI = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017";

// Create a MongoDB client
const client = new MongoClient(MONGO_URI);

// Database & Collection references
let db: Db;
let usersCollection: Collection;
let employeesCollection: Collection;

// Function to connect to the database
export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB using Native Driver!");

        db = client.db("meanStackExample"); // Replace with your actual database name

        // ✅ Create separate collections
        usersCollection = db.collection("users");
        employeesCollection = db.collection("employees");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

// Function to get collections dynamically
export function getCollection(collectionName: "users" | "employees"): Collection {
    if (!db) {
        throw new Error("❌ Database not connected. Call `connectToDatabase()` first.");
    }

    if (collectionName === "users") return usersCollection;
    if (collectionName === "employees") return employeesCollection;

    throw new Error(`❌ Collection '${collectionName}' not found.`);
}