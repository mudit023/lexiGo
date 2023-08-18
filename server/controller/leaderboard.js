const User = require("../model/user");

// @desc    get leaderboard of the users
// @route   GET /api/leaderboard
// @access  Private
const getGlobalLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}).sort({ score: -1 });
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
  getGlobalLeaderboard,
};
