const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
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
