import {createContext, useContext} from "react"
import io from "socket.io-client"
// import {SOCKET_URL} from "config"

// getting errors from server when trying to connect
export const socket = io.connect('http://localhost:5000/',{
  transports: ['websocket'],
 })
export const SocketContext = createContext()
