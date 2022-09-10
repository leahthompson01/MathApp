// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Lobby from "./Lobby";

export default function ChoiceScreen() {
  let navigate = useNavigate();
  function handleClick(operation) {
    console.log(operation);
    //switched to using useNavigate() instead of Link from react-router-dom
    navigate("/MathApp/quiz", { state: { operation: `${operation}` } });
  }
  return (
    <>
      <div className="optionsPage">
        <Lobby />
        <section className="optionsSection">
          <h2>Choose What Topic You Want to Be Quizzed On</h2>
          <section className="options">
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "addition" }}> */}
              Addition
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "subtraction" }}> */}
              Subtraction
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "division" }}> */}
              Division
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              <img></img>
              {/* <Link to="/MathApp/quiz" state={{ operation: "multiplication" }}> */}
              Multiplication
              {/* </Link> */}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
