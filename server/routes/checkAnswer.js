const express = require("express");
const { checkAnswer } = require("../controller/qa");
const router = express.Router();

router.post("/", checkAnswer);

module.exports = router;
