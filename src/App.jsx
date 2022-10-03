import { useState, useEffect } from "react";
// import io from 'socket.io-client';
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ChoiceScreen from "./components/ChoiceScreen";
import GenerateQuiz from "./components/GenerateQuiz";

import { SocketContext, socket } from "./context/socket";

//this will need to be moved to quizcomponent?
//whichever component generates the quiz pages
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected to socket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnected to socket");
    });

    // return () => {
    //   socket.off('connect')
    //   socket.off('disconnect')
    //   socket.off('pong')
    // }
  }, []);
  console.log(socket);
  return (
    <div className="app">
      <Navbar />
      {/* <Home /> */}
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/MathApp" element={<Home />} />
          <Route path="/MathApp/choiceScreen" element={<ChoiceScreen />} />
          <Route path="/MathApp/quiz" element={<GenerateQuiz />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
