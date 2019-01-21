import { createContext } from 'react'
import io from 'socket.io-client'

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT
export const socket = io(endpoint)

export const SocketAPI = createContext()
