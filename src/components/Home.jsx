import { Link } from "react-router-dom";
import mathMatchLogo from "./Logo2.png";
import Lobby from "../components/Lobby";

export default function Home() {
  return (
    <div className="homeContainer">
      <Lobby />
      <div className="home">
        {/* <img
        className="mainLogo"
        alt="two M's with the words Math Matches written in the middle, across the M's"
        src={mathMatchLogo}
      ></img> */}
        <h1>Operation Battles</h1>

        <h2>
          Battle to see who has the best math skills in Operation Battles!
        </h2>
        <p>
          A site to improve your math skills, with both single and multiplayer
          quizzes
        </p>
        <Link to="/MathApp/ChoiceScreen">{<button>Get Started</button>}</Link>
      </div>
    </div>
  );
}
