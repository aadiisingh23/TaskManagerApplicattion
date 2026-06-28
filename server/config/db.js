// ============================================================
// config/db.js — Database Connection
// ============================================================
// WHY THIS FILE EXISTS:
// We need to connect our server to MongoDB before we can
// save or retrieve any data. This file handles that connection.
// We keep it in a separate file so server.js stays clean.
// ============================================================

// "mongoose" is the library that helps us talk to MongoDB
const mongoose = require("mongoose");

// We create a function called "connectDB"
// A function is a reusable block of code we can call from anywhere
const connectDB = async () => {
  // "async" means this function can use "await" inside it
  // We use async/await because connecting to a database takes time
  // and we don't want the rest of the code to run before it's done

  try {
    // "try" means: attempt to run this code
    // If something goes wrong, jump to the "catch" block below

    // mongoose.connect() actually connects to MongoDB
    // process.env.MONGO_URI reads the value from your .env file
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // "await" means: wait here until the connection is complete
    // The result is stored in "connection"

    // If connection is successful, print a success message
    // connection.connection.host tells us which server we connected to
    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    // "catch" runs if something went wrong in the "try" block
    // For example: wrong password, no internet, wrong URL

    // Print the error message so we know what went wrong
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // process.exit(1) means: stop the server with an error code
    // We do this because the server is useless if it can't reach the database
    process.exit(1);
  }
};

// Export this function so other files can use it
// "module.exports" is how we share code between files in Node.js
module.exports = connectDB;

// ============================================================
// BEGINNER MISTAKES TO AVOID:
// ❌ Don't forget to add your .env file (it won't work without it)
// ❌ Don't paste the MongoDB URI directly here — use process.env
// ❌ Don't forget to whitelist your IP address in MongoDB Atlas
//    (Atlas → Network Access → Add IP Address → Add Current IP)
// ❌ Don't forget to replace <password> in your Atlas URI
// ============================================================
