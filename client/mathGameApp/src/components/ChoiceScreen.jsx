// import { useState } from "react";
import { Link } from "react-router-dom";
import Addition from "./Addition";

export default function ChoiceScreen() {
  // const [addition, setAddition] = useState(false);
  // function addition(){
  //   setAddition(!addition)
  // }
  return (
    <div className="optionsPage">
      <h2>Choose What Topic You Want to Be Quizzed On</h2>
      <section className="options">
        <div>
          <img></img>
          <Link to="/Addition">{<h3>Addition</h3>}</Link>
        </div>
        <div>
          <img></img>
          <h3>
            {/* //need these links to go to separate pages */}
            <a href="">Subtraction</a>
          </h3>
        </div>
        <div>
          <img></img>
          <h3>
            <a href="">Division</a>
          </h3>
        </div>
        <div>
          <img></img>
          <h3>
            <a href="">Multiplication</a>
          </h3>
        </div>
      </section>
    </div>
  );
}
