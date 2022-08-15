import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ChoiceScreen from "./components/ChoiceScreen";
//this will need to be moved to quizcomponent?
//whichever component generates the quiz pages
function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;