// import { useState } from "react";
import { Link } from "react-router-dom";
import GenerateQuiz from "./GenerateQuiz";
import Navbar from "./Navbar";

export default function ChoiceScreen() {
  // const [addition, setAddition] = useState(false);
  // function addition(){
  //   setAddition(!addition)
  // }
  return (
    <>
      <Navbar />
      <div className="optionsPage">
        <h2>Choose What Topic You Want to Be Quizzed On</h2>
        <section className="options">
          <div>
            <img></img>
            <Link to="/quiz" state={{ operation: "addition" }}>
              Addition
            </Link>
          </div>
          <div>
            <img></img>
            <Link to="/quiz" state={{ operation: "subtraction" }}>
              Subtraction
            </Link>
          </div>
          <div>
            <img></img>
            <Link to="/quiz" state={{ operation: "division" }}>
              Division
            </Link>
          </div>
          <div>
            <img></img>
            <Link to="/quiz" state={{ operation: "multiplication" }}>
              Multiplication
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}