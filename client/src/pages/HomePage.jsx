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
    <main>
      <section className="flex justify-center items-center sm:gap-5 px-3">
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
          <div className="flex justify-center items-center gap-2">
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
    </main>
  );
}

export default HomePage;
