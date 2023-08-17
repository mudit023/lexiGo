// @desc    Get the first question
// @route   GET /api/question:<lan>
// @access  Private
const getQuestion = async (req, res) => {
  res.status(200).json({ message: `Question of ${req.params.lan}` });
};

// @desc    Post the answere selected by the user and return next question
// @route   POST /api/checkanswer
// @payload   {questionId, OptionId, Difficulty, UserId}
// @access  Private
const checkAnswer = async (req, res) => {
  if (!req.body.data) {
    res.status(400);
    throw new Error("Please send the question and option JSON.");
  }
  res.status(200).json({ message: "Correct answer!" });
};

module.exports = { getQuestion, checkAnswer };
