import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <img alt="logo for math fights"></img>
      <h1>Math Match</h1>

      <h2>Meet your match in Math match!</h2>
      <p>
        A site to improve your math skills, with both single and multiplayer
        quizzes
      </p>
      <Link to="/ChoiceScreen">{<button>Get Started</button>}</Link>
    </div>
  );
}
