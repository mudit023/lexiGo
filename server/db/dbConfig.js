require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error.", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went wrong in DB");
    console.log("error: ", error.message);
  }
};
