import { Link } from "react-router-dom";
import mathMatchLogo from "./Logo2.png";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          {" "}
          <img
            className="mainLogo"
            alt="two M's with the words Math Matches written in the middle, across the M's"
            src={mathMatchLogo}
          ></img>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Contact</li>
        <li>MultiPlayer</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
