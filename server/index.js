const dotenv = require("dotenv").config();
const connect = require("./db/dbConfig");
const express = require("express");
const cors = require("cors");
const apiQuestion = require("./routes/getQuestionRoute");
const apiCheckAnswer = require("./routes/checkAnswer");
const apiUser = require("./routes/user");
const { errorHandler } = require("./middleware/errorMiddleware");
// const Questions = require("./model/questions");
// const User = require("./model/user");

const port = process.env.PORT || 8000;
const app = express({});

// async function run2() {
//   const temp = await Questions.create();
// }
// run2();
// For POST request JSON data
app.use(
  cors({
    origin: "https://lexi-go.vercel.app",
  })
);
app.use(express.json());

app.use("/api/user", apiUser);
app.use("/api/question", apiQuestion);
app.use("/api/checkanswer", apiCheckAnswer);

// Overriding the default express error handling
app.use(errorHandler);
connect()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch(() => console.log("Can't connect to database!"));
