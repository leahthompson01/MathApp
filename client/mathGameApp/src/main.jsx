import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ChoiceScreen from "./components/ChoiceScreen";
import Addition from "./components/Addition";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/choiceScreen" element={<ChoiceScreen />} />
      <Route path="/Addition" element={<Addition />} />
    </Routes>
  </BrowserRouter>
);
