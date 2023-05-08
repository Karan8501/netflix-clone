import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '..//assets/logo.png'

function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className='flex a-center j-between'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={()=>navigate(props.login?"/login" : "/signup")}>
        {
          props.login ? "Log In" : "Sign Up"
        }
      </button>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 5rem;
  height: 5.5rem;
  img{
    width: 162px;
    height: auto;
  }
  button{
    padding: 0.5rem 1rem;
    background-color: rgb(229,9,20);
    border-radius: 0.185rem;
    border: none;
    cursor: pointer;
    color:#fff;
    font-weight: bolder;
    font-size: 0.9rem;
  }
`;

export default Header
