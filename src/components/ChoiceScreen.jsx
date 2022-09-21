// import { useState } from "react";
import { useNavigate, useContext } from "react-router-dom";
import {SocketContext} from '../context/socket'
import Lobby from "./Lobby";



export default function ChoiceScreen() {
  const socket = useContext(SocketContext)
  let navigate = useNavigate();
  function handleClick(operation) {
    // console.log(operation);
    //switched to using useNavigate() instead of Link from react-router-dom
    // here is where code to join room would go
    socket.emit("join","new room")
    navigate("/MathApp/quiz", { state: { operation: `${operation}` } });
  }
  return (
    <>
      <div className="optionsPage">
        {/* <Lobby /> */}
        <section className="optionsSection">
          <h2>Choose What Topic You Want to Be Quizzed On</h2>
          <h3>Click Button Below to Join Lobby</h3>
          <section className="options">
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "addition" }}> */}
              Addition
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "subtraction" }}> */}
              Subtraction
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "division" }}> */}
              Division
              {/* </Link> */}
            </div>
            <div onClick={(e) => handleClick(e.target.innerText)}>
              <img></img>
              {/* <Link to="/MathApp/quiz" state={{ operation: "multiplication" }}> */}
              Multiplication
              {/* </Link> */}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
