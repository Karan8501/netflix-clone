import React from 'react'
import styled from 'styled-components'
import BackgroundImg  from '../assets/login.jpg'

function Background() {
  return (
    <Container>
      <img src={BackgroundImg} alt="background" />
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img{
        height: 100%;
        width: 100%;
    }
`;


export default Background
