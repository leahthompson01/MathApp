import { useEffect, useState,useContext } from "react";
import { SocketContext } from "../context/socket";
import {useNavigate} from "react-router-dom"
import { v4 as uuid } from "uuid";


export default function Lobby({message}) {
  console.log(message)
  const [username,setUsername] = useState('')
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [lobbyCode, setLobbyCode] = useState('');
  const socket = useContext(SocketContext)
 let navigate = useNavigate()
  useEffect(()=> {
    if(message !== undefined && message.length >= 2 ){
      setUsersInLobby(prevArr => [message[0]])
    }
  }, [message])
  // console.log(usersInLobby)
  function handleClick() {
    //   this will be the function that sends
    //request to server to start lobby
    // io.socket
  }
  function handleLeave(){
    socket.emit('leave', {'username': message[0], 'room': message[1]})
    navigate("/MathApp/")
  }
  function handleJoin() {
    // this will handle joining an existing lobby
  }
  return (
    <section className="lobby">
      {usersInLobby.length < 1 ? (
        <div>
          <p>No Users in Lobby</p>
          <p>Click Below to Create New Lobby</p>
          <button onClick={handleClick}>New Lobby</button>
          <p>Join Existing Game</p>
          <form>
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" name="lobbyCode" value={lobbyCode} onChange={e => setLobbyCode(e.target.value)} />
            <button onClick={handleJoin}>Join</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Lobby Code: {message[1]}</p>
          {usersInLobby.length >= 1 &&
          <section className="users">
            Users in Lobby: {
            usersInLobby.map(user => (
              <p
              key={uuid()}>{user.toUpperCase()}</p>
            ))
            }
          </section>
          }
          <button onClick={handleLeave}>Leave Lobby</button>
        </div>
      )}
      {/* will show all users in the lobby */}
    </section>
  );
}
