const connect = require("../db/dbConfig");
const {
  calculateScore,
  proficiencyCalculator,
  getNextQueDifficulty,
} = require("../helper/score");
const Question = require("../model/questions");
const User = require("../model/user");
connect();

// @desc    Get the first question
// @route   GET /api/question:<lan>
// @access  Private
const getQuestion = async (req, res) => {
  const questions = await Question.find({
    language: `${req.params.lan}`,
  }).limit(10);
  // To get a random question among 1-10
  const random = Math.floor(Math.random() * 10);
  res.status(200).json(questions[random]);
};

// For internal use. To update user stats after right ans
const updateUserStats = async (userId, increment, attemptedObj) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ error: "User not found!" });
      return;
    }
    user.score += increment;
    const newScore = user.score;
    const newPro = proficiencyCalculator(newScore).proficiencyLevel;
    user.proficiencyLevel = newPro;
    user.attemptedQuestions.push(attemptedObj);

    const updatedUser = await user.save();
    console.log("User updated successfully!");
  } catch (error) {
    console.log(error);
  }
};

// For internal use. To get next question
const getNextQue = async (
  difficulty,
  isCorrect,
  questionId,
  userId,
  language
) => {
  try {
    console.log("In get next question");
    const temp = getNextQueDifficulty(difficulty, isCorrect);
    const random = Math.floor(Math.random() * temp.length);
    const nextQueDifficulty = temp[random];
    const allQue = await Question.find({
      difficulty: nextQueDifficulty,
    });
    const attempted = await User.findById(userId).select("attemptedQuestions");
    let nextQue = {};
    if (attempted.attemptedQuestions.length > 0) {
      console.log("In length > 0");

      const unavailableQue = await User.aggregate([
        { $unwind: "$attemptedQuestions" }, // Unwind the attemptedQuestions array
        { $match: { "attemptedQuestions.language": language } }, // Filter for documents with language="english"
        { $project: { "attemptedQuestions.questionId": 1 } }, // Project only the questionId
      ]);
      const unavailableQueId = unavailableQue.map((result) => {
        const id = result.attemptedQuestions.questionId;
        return id + "";
      });
      // console.log("attempted", unavailableQueId);
      // const unavailableQueId = unavailableQue.correctAnswers.map(
      //   (item) => item.questionId
      // );
      nextQue = allQue.filter((item) => {
        const id = item._id + "";
        return !unavailableQueId.includes(id);
      })[0];
      // console.log("filtered questions", nextQues);
    } else {
      console.log("In 0");
      nextQue = allQue[0];
    }
    // console.log("available questions", nextQue);

    if (!nextQue) {
      console.log("Cannot find next question!");
      return;
    }
    return nextQue;
  } catch (error) {
    console.log(error);
  }
};

// @desc    Post the answere selected by the user and return next question
// @route   POST /api/checkanswer
// @payload   {questionId, selectedId, UserId, language}
// @access  Private
const checkAnswer = async (req, res) => {
  try {
    if (!req.body.data) {
      res.status(400);
      throw new Error("Please send the question and option JSON.");
    }
    const que = await Question.findById(req.body.data.questionId);
    const isCorrect = que.correctOption === req.body.data.selectedId;
    const userId = req.body.data.userId;

    // If answer is correct update the progress, score, and proficiency level
    if (isCorrect) {
      const attemptedObj = {
        questionId: req.body.data.questionId,
        language: req.body.data.language,
        status: true,
      };
      const increment = calculateScore(que.difficulty);
      await updateUserStats(userId, increment, attemptedObj);
      const nextQue = await getNextQue(
        que.difficulty,
        true,
        req.body.data.questionId,
        userId,
        req.body.data.language
      );
      res
        .status(200)
        .json({ data: nextQue, message: "Correct answer!", code: 1 });
    } else {
      const attemptedObj = {
        questionId: req.body.data.questionId,
        language: req.body.data.language,
        status: false,
      };
      await updateUserStats(userId, 0, attemptedObj);
      const nextQue = await getNextQue(
        que.difficulty,
        false,
        req.body.data.questionId,
        userId,
        req.body.data.language
      );
      res
        .status(200)
        .json({ data: nextQue, message: "Incorrect answer!", code: 0 });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getQuestion, checkAnswer };
