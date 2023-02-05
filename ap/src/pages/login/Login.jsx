import "./login.scss"
import logo from "../../images/logo.png";
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";
import {Navigate } from "react-router-dom"

export default function Login() {

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const[home, setHome] = useState(false);
    if(home){
         return <Navigate to="/"/>
    }
    if(register){
        return <Navigate to="/register"/>
      }
      const Login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        })
            .then(response => {
                sessionStorage.setItem('accessToken', response.data.accessToken)
                sessionStorage.setItem('auth', response.data.auth)
                sessionStorage.setItem('user', JSON.stringify(response.data.user))
            })
            .then(() => {
                navigate('/')
            })
    }
  return (
    <div className="login">
        <div className="top">
            <div className="wrapper">
            <img className="logo" src={logo} alt=""  onClick={()=> setHome(true)}/>
            <button className="registerButton" onClick={()=> setRegister(true)} >Sign up</button>
        </div>
        </div>
        <form>
        <div className="container">
            <h2> Welcome back!</h2>
          
            <div className="input">
             <input type="text" placeholder="Username"  className="formControl" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" className="formControl"  onChange={(e) => setPassword(e.target.value)}/>
            <button className="loginButton" onClick={Login}> Sign in</button>
            </div>
            </div>
            </form>
            

       
      
       
    </div>
  )
}
