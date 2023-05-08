import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import video from '../assets/test.mp4';

function Player() {
    const navigate = useNavigate();
  return (
    <Container>
        <div className="player">
            <div className="back">
                <BsArrowLeft onClick={()=>navigate(-1)}></BsArrowLeft>
            </div>
            <video src={video} autoPlay loop controls disablePictureInPicture></video>

        </div>
      
    </Container>
  )
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    .back{
        position: absolute;
        padding: 2rem;
        z-index: 1;
        svg{
            font-size:1.5rem;
            cursor: pointer;
        }
    }
    video{
        height:100vh;
        width: 100vw;
        object-fit: cover;
    }

`;

export default Player
