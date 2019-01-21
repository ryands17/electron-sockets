import React from 'react'
import logo from './logo.svg'
import styled, { keyframes } from 'styled-components'

const AppLogo = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Img = styled.img`
  animation: ${AppLogo} infinite 20s linear;
  height: 40vmin;
`

function Logo() {
  return <Img src={logo} alt="logo" />
}

export default Logo
