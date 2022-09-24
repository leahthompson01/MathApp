import { Link } from "react-router-dom";
import mathMatchLogo from "./Logo2.png";
import Lobby from "../components/Lobby"

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
      <h1>Math Match</h1>

      <h2>Meet your match in Math match!</h2>
      <p>
        A site to improve your math skills, with both single and multiplayer
        quizzes
      </p>
      <Link to="/MathApp/ChoiceScreen">{<button>Get Started</button>}</Link>
    </div>
    </div>
  );
}
