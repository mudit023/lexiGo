const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  selectedLanguage: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  attemptedQuestions: [
    {
      questionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question", // Reference to the Question model
      },
      language: {
        type: String,
      },
      status: {
        type: Boolean,
      },
    },
  ],
  score: [
    {
      language: {
        type: String,
      },
      score: {
        type: Number,
      },
    },
  ],
  progress: [
    {
      language: {
        type: String,
      },
      count: {
        type: Number,
      },
    },
  ],
  proficiencyLevel: [
    {
      language: {
        type: String,
        default: "english",
      },
      level: {
        type: Number,
        default: 1,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  authId: {
    type: String,
    required: true,
    unique: true,
  },
});

// Export the user schema
module.exports = mongoose.model("User", userSchema);
