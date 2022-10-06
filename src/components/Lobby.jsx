import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/socket";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Lobby({
  message,
  users,
  currentLobby,
  newUser,
  currentUser,
}) {
  // console.log("message " + message);
  // console.log(users)
  // console.log('current Lobby '+currentLobby)
  // console.log('new user is '+ newUser)
  const [username, setUsername] = useState("");
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [lobbyCode, setLobbyCode] = useState("");
  const [data, setData] = useState({});
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  useEffect(() => {
    //only getting message when new user starts brand new lobby
    if (message !== undefined && message.length >= 2) {
      if (users == "undefined") {
        setUsersInLobby((prevArr) => [
          ...prevArr,
          { quizSubmitted: false, username: message[0] },
        ]);
      }
      // console.log(usersInLobby);
      setUsername(message[0]);
      setLobbyCode(message[1]);
    }
  }, [message]);
  // console.log("there are " + users.length + " users");

  // (message == undefined || message.length < 2)
  useEffect(() => {
    if (users !== undefined) {
      setUsersInLobby(users);
    }
    // } else if (
    //   users !== undefined &&
    //   message !== "undefined" &&
    //   message.length >= 2
    // ) {
    //   setUsersInLobby((prevArr) => [...prevArr, ...users]);
    // }
  }, [users]);
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== "") {
      setUsername(currentUser);
    }
  }, [currentUser]);

  // console.log(usersInLobby);
  useEffect(() => {
    console.log("new user is: " + newUser);
    console.log("Users are: " + users);
    if (newUser !== undefined && users.length === usersInLobby.length) {
      setUsersInLobby((prevArr) => [
        ...prevArr,
        { username: newUser, quizSubmitted: false },
      ]);
      // navigate('')
    } else if (newUser !== undefined && users[users.length - 1] !== undefined) {
      console.log(users[users.length - 1]);
      setUsersInLobby(users);
    }
  }, [newUser]);
  useEffect(() => {
    if (currentLobby !== undefined) {
      setLobbyCode(currentLobby);
    }
  }, [currentLobby]);

  // console.log(usersInLobby)
  // console.log(lobbyCode)
  function handleLeave() {
    socket.emit("leave", { username: username, room: lobbyCode });

    navigate("/MathApp/");
  }
  let quiz;
  function handleJoin(event) {
    // this will handle joining an existing lobby
    socket.emit("existing_room", { username, lobbyCode });
    event.preventDefault();

    navigate("/MathApp/quiz", {
      state: {
        joiningQuiz: true,
        lobbyCode: lobbyCode,
        users: data,
        currentUser: username,
      },
    });
  }

  // socket.on('message', msg => console.log('this is the msg '+msg))
  // console.log(message)
  return (
    <section className="lobby">
      {message === undefined || usersInLobby.length < 1 ? (
        <div>
          <p>No Users in Lobby</p>
          {/* <p>Click Below to Create New Lobby</p>
          <button onClick={handleClick}>New Lobby</button> */}
          {/* <p>Join Existing Game</p> */}
          <form>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Lobby Code:</label>
            <input
              type="text"
              name="lobbyCode"
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
            />
            <button type="submit" onClick={(event) => handleJoin(event)}>
              Join
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Lobby Code: {lobbyCode}</p>
          {usersInLobby.length > 1 && (
            <section className="users">
              Users in Lobby:{" "}
              {usersInLobby.map((user) => (
                <p key={uuid()}>
                  {user.username !== undefined && user.username.toUpperCase()}
                </p>
              ))}
            </section>
          )}
          <div>
            {usersInLobby.length === 1 && (
              <section className="users">
                <p> Users in Lobby: {message[0].toUpperCase()} </p>
              </section>
            )}
          </div>
          <button onClick={handleLeave}>Leave Lobby</button>
        </div>
      )}
      {/* will show all users in the lobby */}
    </section>
  );
}
