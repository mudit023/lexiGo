const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
      },
      optionId: {
        type: Number,
      },
    },
  ],
  correctOption: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
