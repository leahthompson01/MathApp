import { useState } from "react";
import { v4 as uuid } from "uuid";
// import useWebSocket from ["react-use-websocket"]

export default function Lobby() {
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [lobbyCode, setLobbyCode] = useState("");
  function handleClick() {
    //   this will be the function that sends
    //request to server to start lobby
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
            <input type="text" name="lobbyCode" value={lobbyCode} />
            <button onClick={handleJoin}>Join</button>
          </form>
        </div>
      ) : (
        <div>
          {usersInLobby.forEach((userName) => (
            <p key={uuid()}>{userName}</p>
          ))}
        </div>
      )}
      {/* will show all users in the lobby */}
    </section>
  );
}
