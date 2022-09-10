import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Lobby() {
  const [usersInLobby, setUsersInLobby] = useState([]);
  function handleClick() {
    //   this will be the function that sends
    //request to server to start lobby
  }
  return (
    <section className="lobby">
      {usersInLobby.length < 1 ? (
        <div>
          <p>No Users in Lobby</p>
          <p>Click Below to Create New Lobby</p>
          <button onClick={handleClick}>New Lobby</button>
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
