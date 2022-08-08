import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <img alt="logo for math fights"></img>
      <h1>Math Fights</h1>
      <Link to="/ChoiceScreen">{<button>Get Started</button>}</Link>
    </div>
  );
}
