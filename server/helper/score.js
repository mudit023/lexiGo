const difficultyMap = [
  { difficulty: 1, weight: 5 },
  { difficulty: 2, weight: 10 },
  { difficulty: 3, weight: 15 },
];

const proficiencyMap = [
  { proficiencyLevel: 1, text: "Beginner" },
  { proficiencyLevel: 2, text: "Intermidiate" },
  { proficiencyLevel: 3, text: "Professional" },
];

const calculateScore = (difficulty) => {
  const score = difficultyMap.filter((item) => {
    if (item.difficulty === difficulty) return item;
  });
  return score[0].weight;
};

const proficiencyCalculator = (score) => {
  if (score <= 50) {
    return proficiencyMap[0];
  } else if (score > 50 && score <= 100) {
    return proficiencyMap[1];
  } else if (score > 100) {
    return proficiencyMap[2];
  }
};

const getNextQueDifficulty = (difficulty, isCorrect) => {
  if (difficulty == 1 && isCorrect) return [2, 3];
  else if (difficulty == 1 && !isCorrect) return [1];
  else if (difficulty == 2 && isCorrect) return [2, 3];
  else if (difficulty == 2 && !isCorrect) return [1, 2];
  else if (difficulty == 3 && isCorrect) return [2, 3];
  else return [1, 2, 3];
};

module.exports = {
  calculateScore,
  difficultyMap,
  proficiencyMap,
  proficiencyCalculator,
  getNextQueDifficulty,
};
