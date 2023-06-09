import { async } from '@firebase/util';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Background from '../components/Background';
import { firebaseAuth } from '../utils/firebase-config';
import Header from '../components/Header';

function Login() {
  const naviaget = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogIn = async ()=>{
    try{
  
      await signInWithEmailAndPassword(firebaseAuth,email,password);
    }
    catch(error){
      console.log(error)
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
      if(currentUser) naviaget("/")
    })
  }
  return (
    <Container>
      <Background/>
      <div className="content">
        <Header/>
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className='title'>
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input type="email" 
                    placeholder='Email'
                    required
                    value ={email}
                    onChange={(e)=>setEmail(e.target.value)}
              />
              <input type="password" 
                    placeholder='password'
                    required
                    value ={password}
                    onChange={(e)=>setPassword(e.target.value)}
              />
              <button onClick={handleLogIn}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 35vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;
export default Login;