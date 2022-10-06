import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketContext } from "../context/socket";
import Lobby from "./Lobby";

export default function ChoiceScreen() {
  const [username, setUsername] = useState("");
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  function handleClick(operation) {
    console.log(operation);
    //switched to using useNavigate() instead of Link from react-router-dom
    // here is where code to join room would go
    socket.emit("create_room", {
      username: username,
      operation: operation.toLowerCase(),
    });

    console.log("trying to join room");
    navigate("/MathApp/quiz", {
      state: {
        operation: `${operation}`,
        currentUser: username,
        creatingQuiz: true,
      },
    });
  }
  // console.log(username)
  return (
    <>
      <div className="optionsPage">
        <Lobby />
        <section className="optionsSection">
          <h2>Choose What Topic You Want to Be Quizzed On</h2>
          <form className="optionsSection">
            <label className="optionsSection">Enter Username: </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </form>
          {username.length < 1 && (
            <div className="optionsSection">You must enter a username</div>
          )}
          {/* <div className="optionsSection">Click Button Below to Join Lobby</div> */}
          <section className="options">
            <div
              onClick={
                username.length > 0 ? (e) => handleClick("Addition") : undefined
              }
            >
              {/* <Link to="/MathApp/quiz" state={{ operation: "addition" }}> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Addition
              {/* </Link> */}
            </div>
            <div
              onClick={
                username.length > 0
                  ? (e) => handleClick("Subtraction")
                  : undefined
              }
            >
              {/* <Link to="/MathApp/quiz" state={{ operation: "subtraction" }}> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
              Subtraction
              {/* </Link> */}
            </div>
            <div
              onClick={
                username.length > 0 ? (e) => handleClick("Division") : undefined
              }
            >
              {/* <Link to="/MathApp/quiz" state={{ operation: "division" }}> */}
              <svg
                // width="24"
                // height="24"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12H20M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Division
              {/* </Link> */}
            </div>
            <div
              onClick={
                username.length > 0
                  ? (e) => handleClick("Multiplication")
                  : undefined
              }
            >
              <img></img>
              {/* <Link to="/MathApp/quiz" state={{ operation: "multiplication" }}> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Multiplication
              {/* </Link> */}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
