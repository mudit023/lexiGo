const connect = require("./db/dbConfig");
const question = require("./model/questions");
const user = require("./model/user");

connect();

// new question
const questionObj = {
  language: "English",
  questionText: "lorem ipsum doller?",
  difficulty: 2,
  options: [
    { optionText: "lorem ipsum", optionId: 1 },
    { optionText: "lorem ipsum", optionId: 2 },
    { optionText: "lorem ipsum", optionId: 3 },
    { optionText: "lorem ipsum", optionId: 4 },
  ],
  correctOption: 2,
};

// new user
const userObj = {
  username: "mav",
  email: "mudit2304@gmail.com",
  selectedLanguage: "English",
  proficiencyLevel: 1,
};

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

// createNewQuestion(questionObj);
createNewUser(userObj);
