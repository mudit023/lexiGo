const dotenv = require("dotenv").config();
const connect = require("./db/dbConfig");
const express = require("express");
const apiQuestion = require("./routes/getQuestionRoute");
const apiCheckAnswer = require("./routes/checkAnswer");
const apiUser = require("./routes/user");
const { errorHandler } = require("./middleware/errorMiddleware");
const questions = require("./model/questions");
const user = require("./model/user");

const port = process.env.PORT || 8000;
const app = express();

// connect();
// async function run() {
//   await user.create({
//     email: "mudit@g.com",
//     selectedLanguage: "english",
//   });
// }
// run();
// For POST request JSON data
app.use(express.json());

app.use("/api/question", apiQuestion);
app.use("/api/checkanswer", apiCheckAnswer);
app.use("/api/user", apiUser);

// Overriding the default express error handling
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
// connect();
