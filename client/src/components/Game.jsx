import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import GameOption from "./GameOption";
function Game() {
  const [loader, setLoader] = useState(true);
  const [question, setQuestion] = useState({});
  const [language, setLanguage] = useState("");
  // const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("isAuthenticated") ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      navigate("/");
    } else {
      const lan = localStorage.getItem("language");
      setLanguage(lan);
      getQuestion(lan);
    }
  }, []);

  async function getQuestion(lan) {
    try {
      setLoader(true);
      const res = await fetch(`http://localhost:8000/api/question/${lan}`);
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        setQuestion(jsonResponse.data);
      }
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function answerHandler(id) {
    const data = {
      questionId: question._id,
      selectedId: id,
      userId: localStorage.getItem("userId"),
      language: language,
    };
    try {
      setLoader(true);
      const laodingToast = toast.loading("Checking...");
      const res = await fetch(`http://localhost:8000/api/checkanswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        toast.success(`Right answer!`, {
          id: laodingToast,
        });
        setQuestion(jsonResponse.data);
      } else {
        const ans = question.options.find(
          (obj) => obj.optionId === question.correctOption
        ).optionText;
        toast.error(
          <span>
            Wrong answer!
            <br />
            <hr />
            Right answer is <b>{ans}</b>
          </span>,
          {
            id: laodingToast,
            duration: 4000,
          }
        );
        setQuestion(jsonResponse.data);
      }
      console.log(jsonResponse);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <main className="w-[100vw] flex flex-col justify-center items-center gap-6 px-3">
      <div className="flex justify-around items-center gap-3 w-full fixed sm:top-[120px] top-[80px]">
        <h4 className="sm:text-2xl">
          Hey{" "}
          <span className="text-green-200 font-semibold uppercase">{`${localStorage.getItem(
            "username"
          )}!`}</span>
        </h4>
        <Link
          to={"/user"}
          className="bg-green-700 font-semibold rounded py-1 px-2 sm:text-xl"
        >
          Check Stats
        </Link>
      </div>
      <section className="flex justify-center items-center">
        <Toaster />
        {loader ? (
          <h3 className="sm:text-3xl text-2xl font-bold">Loading.....</h3>
        ) : (
          <div className="max-w-[500px]">
            <h3 className="sm:text-3xl text-2xl font-bold">
              {question.questionText}
            </h3>
            <div className="flex flex-col gap-3 justify-center items-start mt-6">
              {question.options.map((item, idx) => (
                <GameOption
                  key={idx}
                  text={item.optionText}
                  id={item.optionId}
                  selected={answerHandler}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Game;
