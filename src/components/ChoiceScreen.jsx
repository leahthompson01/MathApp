import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { io } from "socket.io-client";
import {SocketContext} from '../context/socket'
import Lobby from "./Lobby";



export default function ChoiceScreen() {
  const [username, setUsername] = useState('')
  const socket = useContext(SocketContext)
  let navigate = useNavigate();
  function handleClick(operation) {
    if(username.length < 1){

    }
    // console.log(operation);
    //switched to using useNavigate() instead of Link from react-router-dom
    // here is where code to join room would go
    socket.emit('create_room',{'username': username, 'operation': operation})
    
    console.log('trying to join room')
    navigate("/MathApp/quiz", { state: { operation: `${operation}` } });
  }
  console.log(username)
  return (
    <>
      <div className="optionsPage">
        {/* <Lobby /> */}
        <section className="optionsSection">
          <h2>Choose What Topic You Want to Be Quizzed On</h2>
          <form className="optionsSection">
            <label className="optionsSection">Enter Username: </label>
            <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          </form>
          {username.length < 1 && <div className="optionsSection">You must enter a username</div>}
          {/* <div className="optionsSection">Click Button Below to Join Lobby</div> */}
          <section className="options">
            <div onClick={username.length>0 ? ((e) => handleClick(e.target.innerText)) : undefined}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "addition" }}> */}
              Addition
              {/* </Link> */}
            </div>
            <div  onClick={username.length>0 ? ((e) => handleClick(e.target.innerText)) : undefined}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "subtraction" }}> */}
              Subtraction
              {/* </Link> */}
            </div>
            <div  onClick={username.length>0 ? ((e) => handleClick(e.target.innerText)) : undefined}>
              {/* <Link to="/MathApp/quiz" state={{ operation: "division" }}> */}
              Division
              {/* </Link> */}
            </div>
            <div  onClick={username.length>0 ? ((e) => handleClick(e.target.innerText)) : undefined}>
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
