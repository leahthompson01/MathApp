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
 
  useEffect(() => {
    if (users !== undefined) {
      setUsersInLobby(users);
    }
  }, [users]);
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== "") {
      setUsername(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("new user is: " + newUser);
    console.log("Users are: " + users);
    if (newUser !== undefined && users.length === usersInLobby.length) {
      setUsersInLobby((prevArr) => [
        ...prevArr,
        { username: newUser, quizSubmitted: false },
      ]);

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

  return (
    <section className="lobby">
      {message === undefined || usersInLobby.length < 1 ? (
        <div>
          <p className="joinP">Join an Existing Game</p>

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
              <section className="usersNames">
                {usersInLobby.map((user) => (
                  <p key={uuid()}>
                    {user.username !== undefined && user.username.toUpperCase()}
                  </p>
                ))}
              </section>
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
