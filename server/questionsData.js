const QUESTIONS_JSON = [
  {
    questionText: "She _____ to the store yesterday.",
    options: [
      { optionText: "go", optionId: 1 },
      { optionText: "went", optionId: 2 },
      { optionText: "gone", optionId: 3 },
    ],
    correctOption: 2,
    difficulty: 1,
  },
  {
    questionText: "I can't believe it's _____!",
    options: [
      { optionText: "rain", optionId: 4 },
      { optionText: "raining", optionId: 5 },
      { optionText: "rains", optionId: 6 },
    ],
    correctOption: 5,
    difficulty: 1,
  },
  {
    questionText: "She _____ to the party if she wasn't sick.",
    options: [
      { optionText: "will go", optionId: 7 },
      { optionText: "would go", optionId: 8 },
      { optionText: "went", optionId: 9 },
    ],
    correctOption: 8,
    difficulty: 2,
  },
  {
    questionText: "By the time he arrived, the movie _____.",
    options: [
      { optionText: "started", optionId: 10 },
      { optionText: "had started", optionId: 11 },
      { optionText: "will start", optionId: 12 },
    ],
    correctOption: 11,
    difficulty: 2,
  },
  {
    questionText: "I wish I _____ play the piano.",
    options: [
      { optionText: "can", optionId: 13 },
      { optionText: "could", optionId: 14 },
      { optionText: "will", optionId: 15 },
    ],
    correctOption: 14,
    difficulty: 3,
  },
  {
    questionText: "He had never seen a _____ beautiful sunset.",
    options: [
      { optionText: "so", optionId: 16 },
      { optionText: "such", optionId: 17 },
      { optionText: "too", optionId: 18 },
    ],
    correctOption: 17,
    difficulty: 3,
  },

  {
    questionText: "The cat is ____ the table.",
    options: [
      { optionText: "under", optionId: 85 },
      { optionText: "on", optionId: 86 },
      { optionText: "in", optionId: 87 },
    ],
    correctOption: 85,
    difficulty: 1,
  },
  {
    questionText: "She put her keys ____ the bag.",
    options: [
      { optionText: "on", optionId: 88 },
      { optionText: "in", optionId: 89 },
      { optionText: "under", optionId: 90 },
    ],
    correctOption: 89,
    difficulty: 1,
  },
  {
    questionText: "The book is ____ the shelf.",
    options: [
      { optionText: "in", optionId: 91 },
      { optionText: "under", optionId: 92 },
      { optionText: "on", optionId: 93 },
    ],
    correctOption: 91,
    difficulty: 1,
  },
  {
    questionText: "The pen is ____ the notebook.",
    options: [
      { optionText: "on", optionId: 94 },
      { optionText: "in", optionId: 95 },
      { optionText: "under", optionId: 96 },
    ],
    correctOption: 95,
    difficulty: 1,
  },
  {
    questionText: "He walked ____ the park.",
    options: [
      { optionText: "on", optionId: 97 },
      { optionText: "in", optionId: 98 },
      { optionText: "through", optionId: 99 },
    ],
    correctOption: 99,
    difficulty: 2,
  },
  {
    questionText: "The cat jumped ____ the table.",
    options: [
      { optionText: "on", optionId: 100 },
      { optionText: "over", optionId: 101 },
      { optionText: "into", optionId: 102 },
    ],
    correctOption: 101,
    difficulty: 2,
  },
  {
    questionText: "She lives ____ the city center.",
    options: [
      { optionText: "on", optionId: 103 },
      { optionText: "in", optionId: 104 },
      { optionText: "at", optionId: 105 },
    ],
    correctOption: 104,
    difficulty: 2,
  },
  {
    questionText: "They arrived ____ the airport yesterday.",
    options: [
      { optionText: "at", optionId: 106 },
      { optionText: "in", optionId: 107 },
      { optionText: "on", optionId: 108 },
    ],
    correctOption: 106,
    difficulty: 2,
  },
  {
    questionText: "The movie starts ____ 8 PM.",
    options: [
      { optionText: "on", optionId: 109 },
      { optionText: "at", optionId: 110 },
      { optionText: "in", optionId: 111 },
    ],
    correctOption: 110,
    difficulty: 3,
  },
  {
    questionText: "The keys are ____ the table.",
    options: [
      { optionText: "in", optionId: 112 },
      { optionText: "on", optionId: 113 },
      { optionText: "under", optionId: 114 },
    ],
    correctOption: 113,
    difficulty: 3,
  },
  {
    questionText: "The bakery is ____ the corner of the street.",
    options: [
      { optionText: "at", optionId: 115 },
      { optionText: "on", optionId: 116 },
      { optionText: "in", optionId: 117 },
    ],
    correctOption: 117,
    difficulty: 3,
  },
  {
    questionText: "The meeting will be held ____ the conference room.",
    options: [
      { optionText: "on", optionId: 118 },
      { optionText: "in", optionId: 119 },
      { optionText: "at", optionId: 120 },
    ],
    correctOption: 119,
    difficulty: 3,
  },
  {
    questionText: "I ____ my favorite movie three times already.",
    options: [
      { optionText: "have watched", optionId: 73 },
      { optionText: "watch", optionId: 74 },
      { optionText: "watched", optionId: 75 },
    ],
    correctOption: 73,
    difficulty: 1,
  },
  {
    questionText: "They ____ to the beach every summer.",
    options: [
      { optionText: "go", optionId: 76 },
      { optionText: "are going", optionId: 77 },
      { optionText: "went", optionId: 78 },
    ],
    correctOption: 76,
    difficulty: 1,
  },
  {
    questionText: "By the time you arrive, we ____ dinner.",
    options: [
      { optionText: "had", optionId: 79 },
      { optionText: "will have", optionId: 80 },
      { optionText: "have", optionId: 81 },
    ],
    correctOption: 80,
    difficulty: 2,
  },
  {
    questionText: "He said that he ____ the book by next week.",
    options: [
      { optionText: "will finish", optionId: 82 },
      { optionText: "finishes", optionId: 83 },
      { optionText: "is finishing", optionId: 84 },
    ],
    correctOption: 82,
    difficulty: 2,
  },

  {
    questionText: "We ____ our flight if we don't hurry.",
    options: [
      { optionText: "will miss", optionId: 55 },
      { optionText: "missed", optionId: 56 },
      { optionText: "would miss", optionId: 57 },
    ],
    correctOption: 55,
    difficulty: 1,
  },
  {
    questionText: "The cat ____ on the windowsill.",
    options: [
      { optionText: "sleeps", optionId: 58 },
      { optionText: "sleeping", optionId: 59 },
      { optionText: "is sleeping", optionId: 60 },
    ],
    correctOption: 60,
    difficulty: 1,
  },
  {
    questionText: "My sister ____ to visit us next week.",
    options: [
      { optionText: "comes", optionId: 61 },
      { optionText: "will come", optionId: 62 },
      { optionText: "come", optionId: 63 },
    ],
    correctOption: 62,
    difficulty: 2,
  },
  {
    questionText: "I ____ this book before.",
    options: [
      { optionText: "read", optionId: 64 },
      { optionText: "have read", optionId: 65 },
      { optionText: "reading", optionId: 66 },
    ],
    correctOption: 65,
    difficulty: 2,
  },
  {
    questionText: "The teacher asked if ____ studied for the test.",
    options: [
      { optionText: "I", optionId: 67 },
      { optionText: "did I", optionId: 68 },
      { optionText: "I did", optionId: 69 },
    ],
    correctOption: 69,
    difficulty: 3,
  },
  {
    questionText: "If I ____ you, I would apologize.",
    options: [
      { optionText: "were", optionId: 70 },
      { optionText: "am", optionId: 71 },
      { optionText: "will be", optionId: 72 },
    ],
    correctOption: 70,
    difficulty: 3,
  },

  {
    questionText: "Synonym of 'happy'",
    options: [
      { optionText: "sad", optionId: 151 },
      { optionText: "joyful", optionId: 152 },
      { optionText: "angry", optionId: 153 },
    ],
    correctOption: 152,
    difficulty: 1,
  },
  {
    questionText: "Antonym of 'strong'",
    options: [
      { optionText: "powerful", optionId: 154 },
      { optionText: "weak", optionId: 155 },
      { optionText: "sturdy", optionId: 156 },
    ],
    correctOption: 155,
    difficulty: 1,
  },
  {
    questionText: "Synonym of 'brave'",
    options: [
      { optionText: "scared", optionId: 157 },
      { optionText: "fearless", optionId: 158 },
      { optionText: "shy", optionId: 159 },
    ],
    correctOption: 158,
    difficulty: 1,
  },
  {
    questionText: "Antonym of 'begin'",
    options: [
      { optionText: "start", optionId: 160 },
      { optionText: "commence", optionId: 161 },
      { optionText: "end", optionId: 162 },
    ],
    correctOption: 162,
    difficulty: 1,
  },
  {
    questionText: "I am going to the store to buy some apples and oranges.",
    options: [
      { optionText: "to buy", optionId: 187 },
      { optionText: "store to buy", optionId: 188 },
      { optionText: "and oranges", optionId: 189 },
      { optionText: "No Error", optionId: 190 },
    ],
    correctOption: 190,
    difficulty: 1,
  },
  {
    questionText: "She hasn't ate lunch yet.",
    options: [
      { optionText: "hasn't ate", optionId: 191 },
      { optionText: "ate lunch", optionId: 192 },
      { optionText: "yet", optionId: 193 },
      { optionText: "No Error", optionId: 194 },
    ],
    correctOption: 191,
    difficulty: 1,
  },
  {
    questionText:
      "My dog barks louder than any other dogs in the neighborhood.",
    options: [
      { optionText: "barks", optionId: 195 },
      { optionText: "louder than", optionId: 196 },
      { optionText: "any other dogs", optionId: 197 },
      { optionText: "No Error", optionId: 198 },
    ],
    correctOption: 198,
    difficulty: 1,
  },
  {
    questionText: "Each of the students have received a textbook.",
    options: [
      { optionText: "Each of", optionId: 199 },
      { optionText: "have received", optionId: 200 },
      { optionText: "a textbook", optionId: 201 },
      { optionText: "No Error", optionId: 202 },
    ],
    correctOption: 200,
    difficulty: 1,
  },
  {
    questionText:
      "He likes to read books, watch movies, and going to concerts.",
    options: [
      { optionText: "to read", optionId: 203 },
      { optionText: "watch movies", optionId: 204 },
      { optionText: "going to", optionId: 205 },
      { optionText: "No Error", optionId: 206 },
    ],
    correctOption: 205,
    difficulty: 2,
  },
  {
    questionText:
      "The company's profits have been steadily increasing over the years.",
    options: [
      { optionText: "The company's", optionId: 207 },
      { optionText: "profits have been", optionId: 208 },
      { optionText: "steadily increasing", optionId: 209 },
      { optionText: "No Error", optionId: 210 },
    ],
    correctOption: 210,
    difficulty: 2,
  },
  {
    questionText: "Her and I went to the concert last night.",
    options: [
      { optionText: "Her and I", optionId: 211 },
      { optionText: "went to", optionId: 212 },
      { optionText: "the concert", optionId: 213 },
      { optionText: "No Error", optionId: 214 },
    ],
    correctOption: 211,
    difficulty: 2,
  },
  {
    questionText: "The movie was so boring that I leave before it ended.",
    options: [
      { optionText: "was so", optionId: 215 },
      { optionText: "that I leave", optionId: 216 },
      { optionText: "before it ended", optionId: 217 },
      { optionText: "No Error", optionId: 218 },
    ],
    correctOption: 216,
    difficulty: 2,
  },
  {
    questionText: "Their going to the beach tomorrow, but I'm staying home.",
    options: [
      { optionText: "Their going", optionId: 219 },
      { optionText: "to the beach", optionId: 220 },
      { optionText: "but I'm staying", optionId: 221 },
      { optionText: "No Error", optionId: 222 },
    ],
    correctOption: 219,
    difficulty: 3,
  },
  {
    questionText: "Neither of the books were available at the library.",
    options: [
      { optionText: "Neither of", optionId: 223 },
      { optionText: "books were", optionId: 224 },
      { optionText: "available at", optionId: 225 },
      { optionText: "No Error", optionId: 226 },
    ],
    correctOption: 224,
    difficulty: 3,
  },
];

module.exports = QUESTIONS_JSON;
