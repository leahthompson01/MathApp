import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ChoiceScreen from "./components/ChoiceScreen";
import GenerateQuiz from "./components/GenerateQuiz";
//this will need to be moved to quizcomponent?
//whichever component generates the quiz pages
function App() {
  return (
    <div className="app">
      <Navbar />
      {/* <Home /> */}
      <Routes>
        <Route path="/MathApp" element={<Home />} />
        <Route path="/choiceScreen" element={<ChoiceScreen />} />
        <Route path="/quiz" element={<GenerateQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
