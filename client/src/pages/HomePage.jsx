import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/human.png";
import img2 from "../assets/lexigo-instructions.svg";
import { useCtx } from "../store/userContext";
import Accordion from "../components/Accordion";

function HomePage() {
  const [showStats, setShowStats] = useState(false);
  const ctx = useCtx();

  const accordionData = [
    {
      title: "How to start the game?",
      content:
        "Login/Signup, you'll be redirected to the homepage then click on the 'Start Now' button after reading all the Game instructions to start the game.",
    },
    {
      title: "How to submit the answers?",
      content:
        "Click on the option to submit the answer. As soon as you'll click your answer will be evaluated and you'll get response and next question.",
    },
    {
      title: "Dynamic Questions",
      content:
        "If your answer is right then the next question will be of same or higher difficulty. If you failed to answer correctly then you'll get the same or lower difficulty questions.",
    },
    {
      title: "Check your progress, score, and proficiency level.",
      content:
        "You can check your game stats by clicking on check stats button on your game page.",
    },
    {
      title: "Change your selected language.",
      content:
        "You can change the language you want to practice after signing up also. Go to your stats page and click on the dropdown of change language. Select your language and then click on the 'Game' button.",
    },
    {
      title: "Reset your progress of the selected language.",
      content:
        "You can reset your selected language progress by clicking on 'reset' button on your stats page.",
    },
    {
      title: "Leaderboard of your selected language.",
      content:
        "You can check where you stand among your peers in your learning journey of a new language. Go to your stats page and click on 'Leaderboard' button.",
    },
    {
      title: "Scoring system.",
      content:
        "You'll get 5 marks for 'Easy' questions, 10 marks for 'Medium' questions and 15 marks for 'Hard' questions.",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setShowStats(true);
    } else {
      setShowStats(false);
    }
  }, [ctx.isAuthenticated]);

  return (
    <main className="flex flex-col gap-5 justify-center items-center">
      <section className="flex justify-center items-center sm:gap-5 px-3 min-h-[90vh]">
        <div className="flex flex-col gap-6 justify-center sm:items-start items-center">
          <div className="flex flex-col justify-center sm:items-start items-center">
            <h1 className="sm:text-7xl text-3xl font-bold text-green-200">
              Be a multi-lingual
            </h1>
            <p className="sm:max-w-[70%] max-w-[90%] sm:text-lg text-sm mt-3 sm:text-left text-center">
              LexiGo is the only app you need to learn your second language. An
              exciting way to learn a new language!
            </p>
          </div>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <Link
              to={`${
                localStorage.getItem("isAuthenticated") === "true"
                  ? "/game"
                  : "/login"
              }`}
              className="bg-green-700 font-semibold rounded py-1 px-2 sm:text-xl shadow-md shadow-slate-900"
            >
              Start Now
            </Link>
            <a
              href="#rules"
              className="bg-yellow-700 font-semibold rounded py-1 px-2 sm:text-xl shadow-md shadow-slate-900"
            >
              Rules & Features
            </a>
            {showStats ? (
              <Link
                to={"/user"}
                className="bg-yellow-700 font-semibold rounded py-1 px-2 sm:text-xl shadow-md shadow-slate-900"
              >
                Your Stats
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="sm:block hidden">
          <img src={img1} width={"450px"} />
        </div>
      </section>

      <section
        id="rules"
        className="flex flex-col justify-center items-center px-3 mb-5"
      >
        <h1 className="sm:text-5xl text-3xl border-b-2">
          Instructions and Features
        </h1>
        <div className="flex justify-center items-start gap-5 mt-10 w-full">
          <div className="sm:flex sm:justify-center sm:items-center hidden">
            <img src={img2} alt="instructions" width={"500px"} />
          </div>
          <div>
            {accordionData.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center min-w-full px-3 gap-5 mt-8 mb-1">
        <h3>
          Made by{" "}
          <a href="https://twitter.com/muditwt" target="_blank">
            Mudit
          </a>
        </h3>
        <h3>
          <a href="https://github.com/mudit023/lexiGo" target="_blank">
            GitHub
          </a>
        </h3>
      </section>
    </main>
  );
}

export default HomePage;
