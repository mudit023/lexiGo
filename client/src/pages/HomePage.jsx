import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div
        className={`w-full bg-green-700 font-semibold rounded mt-2 py-1 px-2`}
      >
        <Link to={"/signup"}>Signup</Link>
      </div>
      <div
        className={`w-full bg-green-700 font-semibold rounded mt-2 py-1 px-2`}
      >
        <Link to={"/login"}>login</Link>
      </div>
    </div>
  );
}

export default HomePage;
