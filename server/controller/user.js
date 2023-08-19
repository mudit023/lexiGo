const User = require("../model/user");
// const { connect } = require("../routes/getQuestionRoute");
// connect();
// @desc    used to verify user and get it details
// @route   GET /api/user/verify
// @params   {authtoken}
// @access  Private
const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      authId: `${req.params.token}`,
    });
    if (!user) {
      res.status(400).json({ code: 0, message: "User not found" });
      return;
    }

    if (user.isAdmin) {
      const obj = {
        email: user.email,
        score: user.score,
        progress: user.progress,
        language: user.selectedLanguage,
        userId: user._id,
        level: user.proficiencyLevel,
        code: 2,
        message: "Admin found!",
      };
      res.status(200).json(obj);
    } else {
      const obj = {
        email: user.email,
        score: user.score,
        progress: user.progress,
        language: user.selectedLanguage,
        userId: user._id,
        level: user.proficiencyLevel,
        code: 1,
        message: "User found!",
      };
      res.status(200).json(obj);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// @desc    used to update the language
// @route   POST /api/user/updatelan
// @payload   {userId, language}
// @access  Private

const updateLanguage = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400);
      throw new Error("Please send the body JSON!");
    }
    const user = await User.findOne({ _id: req.body.userId });
    if (user) {
      user.selectedLanguage = req.body.language;
      const scoreObj = user.score.find(
        (obj) => obj.language === req.body.language
      );
      const levelObj = user.proficiencyLevel.find(
        (obj) => obj.language === req.body.language
      );
      const progressObj = user.progress.find(
        (obj) => obj.language === req.body.language
      );
      if (!scoreObj) {
        user.score.push({ language: req.body.language, score: 0 });
        user.proficiencyLevel.push({ language: req.body.language, level: 1 });
        user.progress.push({ language: req.body.language, count: 0 });
        await user.save();
        res.status(200).json({
          code: 1,
          message: `Language updated to ${req.body.language}!`,
          score: 0,
          level: 1,
          progress: 0,
        });
      }
      if (scoreObj) {
        await user.save();
        res.status(200).json({
          code: 1,
          message: `Language updated to ${req.body.language}!`,
          score: scoreObj.score,
          level: levelObj.level,
          progress: progressObj.count,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      code: 0,
      error: "Error occured while updating the language in DB!",
    });
  }
};

// @desc    to get user details
// @route   POST /api/user/signup
// @payload {email, authId, language}
// @access  Private
const signup = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400);
      throw new Error("Please send body JSON!");
    }
    const user = new User({
      username: req.body.email.split("@")[0],
      email: req.body.email,
      selectedLanguage: req.body.language,
      authId: req.body.authId,
    });
    const savedUser = await user.save();
    const resObj = {
      username: savedUser.username,
      score: savedUser.score,
      progress: savedUser.attemptedQuestions,
      userId: savedUser._id,
      level: savedUser.proficiencyLevel,
      message: "User Created Successfully!",
      code: 1,
    };
    res.status(200).json(resObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while creating the user in DB",
      code: 0,
    });
  }
};

// @desc    To reset user current language progress
// @route   POST /api/user/reset
// @payload {userId, language}
// @access  Private
const resetProgress = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400);
      throw new Error("Please send body JSON!");
    }
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(500).json({ error: "user not found!", code: 0 });
    } else {
      const newScore = user.score.filter(
        (obj) => obj.language !== req.body.language
      );
      const newProgress = user.progress.filter(
        (obj) => obj.language !== req.body.language
      );
      const newLevel = user.proficiencyLevel.filter(
        (obj) => obj.language !== req.body.language
      );
      const newQuestion = user.attemptedQuestions.filter(
        (obj) => obj.language !== req.body.language
      );
      user.score = newScore;
      user.progress = newProgress;
      user.proficiencyLevel = newLevel;
      user.attemptedQuestions = newQuestion;
      await user.save();
      res
        .status(200)
        .json({ message: "User progress reset successully!", code: 1 });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while reseting the progress!", code: 0 });
  }
};

// @desc    To get the user's language leaderboard
// @route   POST /api/user/leaderboard
// @payload {language}
// @access  Private
const getLeaderBoard = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400);
      throw new Error("Please send body JSON!");
    }
    const users = await User.aggregate([
      // Match documents with score.language equal to "english"
      { $match: { "score.language": req.body.language } },
      // Unwind the score array to work with its elements
      { $unwind: "$score" },
      // Match only the documents with score.language equal to "english"
      { $match: { "score.language": req.body.language } },
      // Sort the documents by score.score in descending order
      { $sort: { "score.score": -1 } },
    ]);
    if (users.length <= 0) {
      res.status(200).json({ code: 1, message: "Empty Leaderboard!" });
    } else {
      const resArr = users.map((item) => {
        return {
          username: item.username,
          score: item.score,
          level: item.proficiencyLevel,
        };
      });
      res.status(200).json({ code: 1, message: "Data received", resArr });
    }
    // console.log(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  verifyUser,
  signup,
  updateLanguage,
  resetProgress,
  getLeaderBoard,
  // login,
};
