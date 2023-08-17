// @desc    used to set or change the language
// @route   POST /api/user/lan
// @payload   {UserId, language}
// @access  Private
const setLanguage = async (req, res) => {
  if (!req.body.data) {
    res.status(400);
    throw new Error("Please send the language.");
  }
  res.status(200).json({ message: `Language set to ${req.body.data.lan}.` });
};

// @desc    to get user details
// @route   POST /api/user
// @access  Private
const getDetails = async (req, res) => {
  res.status(200).json({ message: `User details are here!` });
};

module.exports = {
  setLanguage,
  getDetails,
};
