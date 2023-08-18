const User = require("../model/user");

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

// @desc    to get user details
// @route   POST /api/user/login
// @payload {authId}
// @access  Private

// const login = async (req, res) => {
//   try {
//     if (!req.body.authId) {
//       res.status(400);
//       throw new Error("Please send authId");
//     }
//     const user = await User.findOne({ authId: req.body.authId });
//     if (!user) {
//       res.status(400).json({ code: 0, message: "User not found" });
//       return;
//     }
//     const progress = (user.attemptedQuestions.length / 50) * 100;
//     if (user.isAdmin) {
//       const resObj = {
//         code: 2,
//         message: "Admin login successful!",
//         username: user.username,
//         email: user.email,
//         score: user.score,
//         progress: progress,
//         language: user.language,
//         userId: user.userId,
//       };
//       res.status(200).json(resObj);
//     }
//     if (!user.isAdmin) {
//       const resObj = {
//         code: 1,
//         message: "User login successful!",
//         username: user.username,
//         email: user.email,
//         score: user.score,
//         progress: progress,
//         language: user.language,
//         userId: user.userId,
//       };
//       res.status(200).json(resObj);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "An error occurred while finding the user in DB",
//       code: 0,
//     });
//   }
// };

module.exports = {
  verifyUser,
  signup,
  updateLanguage,
  // login,
};
