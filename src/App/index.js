import React, { useContext, useState, useEffect } from 'react'
import loadable from '@loadable/component'
import styled from 'styled-components'
import { SocketAPI } from 'socket.context'

const Logo = loadable(() => import('components/Logo'))

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

function App() {
  const socket = useContext(SocketAPI)
  const [sentence, setSentence] = useState(null)

  useEffect(() => {
    socket.on('sentence', sentence => {
      setSentence(sentence)
    })
    return () => socket.off('sentence')
  }, [socket])

  return (
    <div css="text-align: center;">
      <Header>
        <Logo />
        <p>
          Edit <code>src/App/index.js</code> and save to reload. <br />
          {sentence && <span>{sentence}</span>}
        </p>
        <a
          css="color: #61dafb;"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Header>
    </div>
  )
}

export default App
