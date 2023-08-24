import React, { useEffect, useState } from "react";
import LeaderItem from "../components/LeaderItem";

function LeaderBoard() {
  const [language, setLanguage] = useState("");
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "false") {
      navigate("/");
    } else {
      const lan = localStorage.getItem("language");
      setLanguage(lan);
      getLeaderboard(lan);
    }
  }, []);

  async function getLeaderboard(lan) {
    try {
      setLoader(true);
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/leaderboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language: lan }),
        }
      );
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        setData(jsonResponse.resArr);
      } else {
        throw new Error("No Record found!");
      }
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <main className="w-[100vw] px-2 flex flex-col justify-center items-center gap-10">
      <h1 className="sm:text-4xl text-xl font-medium">{`Leaderboard of ${language}`}</h1>
      {loader ? (
        <h3 className="text-2xl font-bold">Loading...</h3>
      ) : (
        <section className="flex flex-col sm:min-w-[90vw] min-w-full gap-4">
          {data.map((item, idx) => (
            <LeaderItem
              key={idx}
              rank={idx + 1}
              username={item.username}
              score={item.score.score}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default LeaderBoard;
