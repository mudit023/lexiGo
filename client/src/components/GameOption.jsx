import React from "react";

function GameOption({ text, selected, id }) {
  function optionHandler() {
    selected(id);
  }
  return (
    <button className="w-full" onClick={optionHandler}>
      {text}
    </button>
  );
}

export default GameOption;
