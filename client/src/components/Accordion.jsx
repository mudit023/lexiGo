import React, { useState } from "react";
import "./Accordion.css";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>{title}</h2>
        <span className={`icon ${isOpen ? "open" : ""}`}>&#9660;</span>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
