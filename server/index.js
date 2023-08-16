const connect = require("./db/dbConfig");
// const QUESTIONS_JSON = require("./questionsData");
const question = require("./model/questions");
const user = require("./model/user");

connect();

// Save the exercise to the database
async function createNewQuestion(obj) {
  try {
    const newQuestion = await question.create(obj);
    console.log(newQuestion);
  } catch (error) {
    console.log(error.message);
  }
}

// Create a new user in the DB
async function createNewUser(obj) {
  try {
    const newUser = await user.create(obj);
    console.log(newUser);
  } catch (error) {
    console.log(error.message);
  }
}

// createNewQuestion(QUESTIONS_JSON);
// createNewUser(userObj);
