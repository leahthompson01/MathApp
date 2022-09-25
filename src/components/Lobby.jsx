import { useEffect, useState,useContext } from "react";
import { SocketContext } from "../context/socket";
import {useNavigate} from "react-router-dom"
import { v4 as uuid } from "uuid";


export default function Lobby({message}) {
  console.log(message)
  const [username,setUsername] = useState('')
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [lobbyCode, setLobbyCode] = useState('');
  const [data,setData] = useState({})
  const socket = useContext(SocketContext)
 let navigate = useNavigate()
  useEffect(()=> {
    if(message !== undefined && message.length >= 2 ){
      setUsersInLobby(prevArr => [message[0]])
    }
  }, [message])

  socket.on('message', msg =>{
    console.log(msg)
  useEffect(() =>{
    if(message === undefined || message.length < 1){
      async function getUsers(){
        try{
          const response = await fetch(`http://localhost:5000/users/${lobbyCode}`)
          const users = await response.json()
          setUsersInLobby(users)
        }catch(err){
        console.log(err)
      }
    }
    getUsers()
  }}, [])
})
  // console.log(usersInLobby)
  function handleLeave(){
    socket.emit('leave', {'username': message[0], 'room': message[1]})
    navigate("/MathApp/")
  }
  let quiz
  function handleJoin(event) {
    
    // this will handle joining an existing lobby
    socket.emit('existing_room',{username, lobbyCode})
    event.preventDefault();
    socket.on('message', data => setData(data))
    navigate("/MathApp/quiz", { state: { joiningQuiz: true, lobbyCode: lobbyCode, users: data } })
  }
  // socket.on('message', data => {
    
  //   console.log(data)
  //   navigate("/MathApp/joinquiz", { state: { quizData: quiz } })
  // })
  return (
    <section className="lobby">
      {usersInLobby.length < 1 && message === undefined  ? (
        <div>
          <p>No Users in Lobby</p>
          {/* <p>Click Below to Create New Lobby</p>
          <button onClick={handleClick}>New Lobby</button> */}
          {/* <p>Join Existing Game</p> */}
          <form >
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            <label>Lobby Code:</label>
            <input type="text" name="lobbyCode" value={lobbyCode} onChange={e => setLobbyCode(e.target.value)} />
            <button type="submit" onClick={event => handleJoin(event)}>Join</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Lobby Code: {message[1]}</p>
          {usersInLobby.length > 1 &&
          <section className="users">
            Users in Lobby: {
            usersInLobby.map(user => (
              <p
              key={uuid()}>{user.username.toUpperCase()}</p>
            ))
            }
          </section>
          }
          {/* {
           usersInLobby.length == 1 &&
            <section className="users">
            Users in Lobby: {
            usersInLobby.map(user => (
              <p
              key={uuid()}>{user.toUpperCase()}</p>
            ))
            }
          </section>
          } */}
          <button onClick={handleLeave}>Leave Lobby</button>
        </div>
      )}
      {/* will show all users in the lobby */}
    </section>
  );
}
