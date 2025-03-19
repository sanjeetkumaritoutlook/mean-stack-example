//MongoDB shell does not support npm modules like bcryptjs directly. You need to hash the password using Node.js instead. Here’s how you can do it:


// Use Node.js to Generate the Hash
//Create a simple Node.js script to generate the hashed password:
const bcrypt = require("bcryptjs");

const plainPassword = "password123"; // Change to your actual password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }
  console.log("Hashed password:", hash);
});

//node hashPassword.js
