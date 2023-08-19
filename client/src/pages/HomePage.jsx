import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/human.png";
import { useCtx } from "../store/userContext";

function HomePage() {
  const [showStats, setShowStats] = useState(false);
  const ctx = useCtx();
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setShowStats(true);
    } else {
      setShowStats(false);
    }
  }, [ctx.isAuthenticated]);
  return (
    <main className="flex flex-col gap-5">
      <section className="flex justify-center items-center sm:gap-5 px-3 min-h-[90vh]">
        <div className="flex flex-col gap-6 justify-center sm:items-start items-center">
          <div className="flex flex-col justify-center sm:items-start items-center">
            <h1 className="sm:text-7xl text-3xl font-bold text-green-200">
              Be a multi-lingual
            </h1>
            <p className="sm:max-w-[70%] max-w-[90%] sm:text-lg text-sm mt-3 sm:text-left text-center">
              LexiGo is the only app you need to learn your second language. An
              exciting way to learn a new laguage!
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Link
              to={`${
                localStorage.getItem("isAuthenticated") === "true"
                  ? "/game"
                  : "/login"
              }`}
              className="bg-green-700 font-semibold rounded py-1 px-2 sm:text-xl"
            >
              Start Now
            </Link>
            <a
              href="#rules"
              className="bg-yellow-700 font-semibold rounded py-1 px-2 sm:text-xl"
            >
              Rules & Features
            </a>
            {showStats ? (
              <Link
                to={"/user"}
                className="bg-yellow-700 font-semibold rounded py-1 px-2 sm:text-xl"
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
        className="flex flex-col justify-center items-start px-3"
      >
        <h1 className="sm:text-5xl text-3xl border-b-2">
          Game Rules and Features
        </h1>
        <ul className="mt-4 sm:list-decimal list-disc flex flex-col gap-2">
          <li>
            Click on{" "}
            <span className="bg-green-700 font-semibold rounded p-1">
              Start Now
            </span>{" "}
            to start the game with your selected language.
          </li>
          <li>Click on the option to submit the answer.</li>
          <li>
            If your answer is right next question will be of same or higher
            difficulty. If you failed to answer correctly then you'll get same
            or lower difficulty questions.
          </li>
          <li>
            You can check your{" "}
            <span className="font-bold text-green-200">game stats</span> by
            clicking on{" "}
            <span className="bg-yellow-700 font-semibold rounded p-1">
              check stats
            </span>{" "}
            button on your game page.
          </li>
          <li>
            You can change your{" "}
            <span className="font-bold text-green-200">selected language</span>{" "}
            by clicking on{" "}
            <span className="bg-yellow-700 font-semibold rounded p-1">
              check stats
            </span>{" "}
            button on your game page.
          </li>
          <li>
            You can reset your{" "}
            <span className="font-bold text-green-200">
              selected language progress
            </span>{" "}
            by clicking on{" "}
            <span className="bg-red-700 font-semibold rounded p-1">reset</span>{" "}
            button on your stats page.
          </li>
        </ul>
        <div className="mt-4">
          <h3 className="sm:text-2xl text-xl font-semibold">Scoring</h3>
          <ul className="mt-2 sm:list-decimal list-disc flex flex-col gap-2">
            <li>Easy: 5 Marks</li>
            <li>Medium: 10 Marks</li>
            <li>Hard: 15 Marks</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
