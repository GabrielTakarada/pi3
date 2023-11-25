const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  const dbUser = process.env.DBUSER;
  const dbPass = encodeURIComponent(process.env.DBPASS);
  const dbHost = process.env.DBHOST; // Ensure this includes the database name

  const connectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

main();

module.exports = main;
