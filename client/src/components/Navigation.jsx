import React from "react";
import { Link } from "react-router-dom";
import { useCtx } from "../store/userContext";

function Navigation() {
  const ctx = useCtx();
  return (
    <nav className="fixed top-0 left-0 min-w-full flex justify-between px-2 py-4 text-xl bg-[#272729] shadow-md">
      <div className="flex justify-center items-center">
        <Link
          to={"/"}
          className="flex gap-2 justify-center items-center font-bold text-cyan-100"
        >
          <span>LexiGo</span>
          <span></span>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
        {localStorage.getItem("isAuthenticated") === "true" ? (
          <button
            onClick={() => ctx.logout()}
            className="bg-red-700 font-semibold rounded py-1 px-2"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              className=" underline text-green-200 font-medium"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="wbg-green-700 font-semibold rounded py-1 px-2"
              to={"/signup"}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
