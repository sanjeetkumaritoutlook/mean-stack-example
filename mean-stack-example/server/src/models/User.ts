//import mongoose from "mongoose";
//Instead of using Mongoose, let's use the MongoDB Native Driver.
// This means no schemas, but you get direct control over MongoDB operations.

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

// Function to connect to the database
export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB using Native Driver!");

        db = client.db("meanStackExample"); // Replace with your actual database name
        usersCollection = db.collection("users"); // Collection reference
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

// Function to get the users collection
export function getUsersCollection() {
    if (!usersCollection) {
        throw new Error("MongoDB is not connected. Call `connectToDatabase()` first.");
    }
    return usersCollection;
}
