import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import styled from 'styled-components'
import Background from '../components/Background';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';


function Signup() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [formValue, setFormValue] = useState({
        email:"",
        password:""
    });

    const handleSignIn = async ()=>{
        try{
            const {email, password} = formValue;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);

        }catch(error){
            console.log(error);
        }

        onAuthStateChanged(firebaseAuth,(currentUser)=>{
           if(currentUser) navigate("/");
        })
    }
  return (
    <Container showPassword ={showPassword}>
        <Background/>
        <div className='content'>
            <Header login={true}/>
            <div className='body flex column a-center j-center'>
                <div className="text flex column">
                    <div className="main-heading">
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h3>Watch anywhere. Cancel anytime.</h3>
                    </div>
                    <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
                </div>
                <div className='form'>
                    <input type="email" placeholder='Email Address' name ="email"
                    required
                    value={formValue.email} 
                    onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})} 
                    />
                    {
                        showPassword &&<input type="password" placeholder='passsword' name='password'
                        required
                        value={formValue.password} 
                        onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})}
                        />
                    }
                    {
                        !showPassword && <button 
                        onClick={()=>setShowPassword(true)}
                        >Get started</button>
                    }
                </div>
                <button onClick={handleSignIn}>Sign Up</button>
            </div>
        </div>
        

    </Container>
  )
}

const Container = styled.div`
    color: white;
    position: relative;
    .content{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.7);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body{
            gap: 1rem;
            .text{
                gap: 1rem;
                text-align: center;
                font-size: 20px;
                word-spacing: 0;
                .main-heading{
                    margin-bottom:0.7rem;
                    line-height: 3rem;
                    h1{
                        font-size: 2.8rem;
                        font-weight: 800;
                        }
                     h3{
                        padding-top  :0.7rem ;
                        font-size: 1.5rem;
                        font-weight: 400;
                        }
                }
             
                h4{
                    font: 1.3rem;
                    font-weight: 400;
                }
            }
            .form{
                margin: 0.7rem;
                display: grid;
                 grid-template-columns: ${({showPassword}) =>
                showPassword ? "1fr 1fr" : "2fr 1fr"};
                width: 60%;
                input{
                    color:#000;
                    border: none;
                    padding: 1rem;
                    font-size: 1.2rem;
                    border:1px solid black;
                    &:focus{
                        outline:none;
                    }
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color: rgb(229,9,20);
                    border: none;
                    cursor: pointer;
                    color:#fff;
                    font-weight: bolder;
                    font-size: 0.9rem;
                }

                
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
            
        }
    }

`;

export default Signup
