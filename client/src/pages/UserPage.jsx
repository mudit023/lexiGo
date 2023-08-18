import React, { useState, useEffect } from "react";
import { useCtx } from "../store/userContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function UserPage() {
  const [loader, setLoader] = useState(true);
  const [stats, setStats] = useState({});
  const ctx = useCtx();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "false") {
      navigate("/");
    } else {
      const authId = localStorage.getItem("authId");
      getStats(authId);
    }
  }, []);

  async function getStats(token) {
    const laodingToast = toast.loading("Loading stats...");
    setLoader(true);
    try {
      const res = await fetch(`http://localhost:8000/api/user/verify/${token}`);
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code > 0) {
        setStats(jsonResponse);
        // console.log("user stats!", jsonResponse);
        toast.success("User found!", {
          id: laodingToast,
        });
      } else {
        console.log("Error:User not found!");
        throw new Error(jsonResponse.message);
      }
      setLoader(false);
    } catch (error) {
      toast.error(`${error.message}`, {
        id: laodingToast,
      });
    }
  }
  async function changeLanHandler(e) {
    const data = {
      userId: stats.userId,
      language: e.target.value,
    };
    // const laodingToast = toast.loading("Updating...");
    try {
      setLoader(true);
      const res = await fetch(`http://localhost:8000/api/user/updatelan`, {
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
        localStorage.setItem("language", e.target.value);
        setStats({ ...stats, language: e.target.value });
      } else {
        throw new Error("Can't update the language!");
      }
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function resetHandler() {}
  return (
    <main className="flex flex-col justify-center items-center px-2 mt-6">
      <Toaster />
      <h1 className="mb-6">Statistics</h1>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <>
          <select
            name="language"
            id="lan-select"
            onChange={changeLanHandler}
            className="mb-2"
          >
            <option value="">Choose a language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
          <section className="flex flex-col justify-center items-start gap-4 max-w-[600px] sm:border sm:p-4 sm:rounded-[24px]">
            <div className="flex justify-center items-center sm:gap-4 flex-wrap gap-1">
              <div className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg">
                <span className="font-bold underline">email:</span>
                <span>{stats.email}</span>
              </div>
              <div className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg">
                <span className="font-bold underline">username:</span>
                <span>{stats.email.split("@")[0]}</span>
              </div>
              <div className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg">
                <span className="font-bold underline">current language:</span>
                <span>{stats.language}</span>
              </div>
            </div>
            <div className="w-full">
              <h3 className="w-full text-xl font-bold text-green-400 border-b-2">
                Score
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.score.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg flex-wrap"
                    >
                      <span className="font-bold underline">
                        {item.language}:
                      </span>
                      <span>{item.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <h3 className="w-full text-xl font-bold text-green-400 border-b-2">
                Progress
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.progress.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg flex-wrap"
                    >
                      <span className="font-bold underline">
                        {item.language}:
                      </span>
                      <span>{((item.count / 40) * 100).toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <h3 className="w-full text-xl font-bold text-green-400 border-b-2">
                Proficiency Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.level.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-1 bg-[#272729] shadow-md sm:p-4 p-2 rounded-lg flex-wrap"
                    >
                      <span className="font-bold underline">
                        {item.language}:
                      </span>
                      <span>
                        {item.level === 1
                          ? "Beginner"
                          : item.level === 2
                          ? "Intermidiate"
                          : "Professional"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <button className="mt-2" onClick={resetHandler}>
            Reset Progress
          </button>
        </>
      )}
    </main>
  );
}

export default UserPage;
