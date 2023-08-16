const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  selectedLanguage: {
    type: String,
    required: true,
  },
  correctAnswers: [
    {
      questionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question", // Reference to the Question model
      },
      language: {
        type: String,
      },
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
  proficiencyLevel: {
    type: Number,
    default: 1,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Export the user schema
module.exports = mongoose.model("User", userSchema);
