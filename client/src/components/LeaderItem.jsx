import React from "react";

function LeaderItem({ username, score, rank }) {
  function getInitial(name) {
    const res = name.substring(0, 2).toUpperCase();
    return res;
  }
  return (
    <div className="flex items-center justify-between bg-zinc-800 rounded-tr-lg rounded-tl-lg p-2 sm:text-lg text-sm w-full">
      <div className="flex justify-center items-center sm:gap-4 gap-1">
        <span>{rank}</span>
        <span className="w-[40px] h-[40px] rounded-[50%] p-2 bg-yellow-500 font-bold flex justify-center items-center">
          {getInitial(username)}
        </span>
      </div>
      <span>{username}</span>
      <span>{`score: ${score}`}</span>
    </div>
  );
}

export default LeaderItem;
