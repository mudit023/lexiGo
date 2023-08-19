const {
  calculateScore,
  proficiencyCalculator,
  getNextQueDifficulty,
} = require("../helper/score");
const Question = require("../model/questions");
const User = require("../model/user");

// @desc    Get the first question
// @route   GET /api/question:<lan>
// @access  Private
const getQuestion = async (req, res) => {
  const questions = await Question.find({
    language: `${req.params.lan}`,
  }).limit(10);
  // To get a random question among 1-10
  const random = Math.floor(Math.random() * 10);
  if (questions.length > 0)
    res.status(200).json({ code: 1, data: questions[random] });
  else res.status(200).json({ message: "No questions found!", code: 0 });
};

// For internal use. To update user stats after right ans
const updateUserStats = async (userId, increment, attemptedObj, lan) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ error: "User not found!" });
      return;
    }
    if (user.score.length === 0) {
      user.score.push({ language: lan, score: increment });
      user.proficiencyLevel.push({ language: lan, level: 1 });
      user.progress.push({ language: lan, count: 1 });
    } else {
      const scoreObj = user.score.find((obj) => obj.language === lan);
      // console.log("score obj***", scoreObj);
      scoreObj.score += increment;
      const newScore = scoreObj.score;

      const newPro = proficiencyCalculator(newScore).proficiencyLevel;
      const proObj = user.proficiencyLevel.find((obj) => obj.language === lan);
      proObj.level = newPro;

      const newCnt = user.progress.find((obj) => obj.language === lan);
      newCnt.count += 1;
    }
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
      language: language,
    });
    const attempted = await User.findById(userId).select("attemptedQuestions");
    let nextQue = {};
    if (attempted.attemptedQuestions.length > 0) {
      const unavailableQue = attempted.attemptedQuestions.filter(
        (item) => item.language === language
      );
      const unavailableQueId = unavailableQue.map((result) => {
        const id = result.questionId;
        return id + "";
      });

      nextQue = allQue.filter((item) => {
        const id = item._id + "";
        return !unavailableQueId.includes(id);
      })[0];
      // console.log("filtered questions", nextQues);
    } else {
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
    if (!req.body) {
      res.status(400);
      throw new Error("Please send the question and option JSON.");
    }
    const que = await Question.findById(req.body.questionId);
    const isCorrect = que.correctOption === req.body.selectedId;
    const userId = req.body.userId;

    // If answer is correct update the progress, score, and proficiency level
    if (isCorrect) {
      const attemptedObj = {
        questionId: req.body.questionId,
        language: req.body.language,
        status: true,
      };
      const increment = calculateScore(que.difficulty);
      await updateUserStats(userId, increment, attemptedObj, req.body.language);
      const nextQue = await getNextQue(
        que.difficulty,
        true,
        req.body.questionId,
        userId,
        req.body.language
      );
      res
        .status(200)
        .json({ data: nextQue, message: "Correct answer!", code: 1 });
    } else {
      const attemptedObj = {
        questionId: req.body.questionId,
        language: req.body.language,
        status: false,
      };
      await updateUserStats(userId, 0, attemptedObj, req.body.language);
      const nextQue = await getNextQue(
        que.difficulty,
        false,
        req.body.questionId,
        userId,
        req.body.language
      );
      res
        .status(200)
        .json({ data: nextQue, message: "Incorrect answer!", code: 0 });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getQuestion, checkAnswer };
