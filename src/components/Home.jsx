import { Link } from "react-router-dom";
import mathMatchLogo from "./Logo2.png";
import Lobby from "../components/Lobby";

export default function Home() {
  return (
    <div className="homeContainer">
      <Lobby />
      <div className="home">
        <h1>Operation Battles</h1>
        <img
          src="/4.png"
          className="studentImg"
          alt="students standing around a whiteboard looking at a math equation"
        ></img>

        <h2>
          Battle to see who has the best math skills in Operation Battles!
        </h2>
        <p>
          A site to improve your math skills, with both single and multiplayer
          quizzes
        </p>
        <Link to="/MathApp/ChoiceScreen">
          {<button>Start a New Game</button>}
        </Link>
      </div>
    </div>
  );
}
