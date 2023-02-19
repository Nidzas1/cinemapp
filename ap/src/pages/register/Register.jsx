import "./register.scss"
import logo from "../../images/logo.png";
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate }  from "react-router-dom";
import { Navigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate();
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
      
    const [login, setLogin] = useState(false);
    const[home, setHome] = useState(false);

    if(home){
         return <Navigate to="/"/>
    }
    if(login){
        return <Navigate to="/login"/>
      }

    const Register = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
        
        })

          navigate("/login")
          console.log("succesfull")
        
    }
    
    
      
  return (
    <div className="register">
        <div className="top">
            <div className="wrapper">
            <img className="logo" src={logo} alt=""  onClick={()=> setHome(true)}/>
            <button className="loginButton" onClick={()=> setLogin(true)} >Sign in</button>
        </div>
        </div>
        <form>
        <div className="container">
            <h2> Enjoy cinema day!</h2>
            <p>Ready to watch? Create membership and reserve your seat.</p>
          
            <div className="input">
            <input type="text" placeholder="First name" className="formControl" onChange={(e) => setFirstName(e.target.value)} required/>
            <input type="text" placeholder="Last name"  className="formControl" onChange={(e) => setLastName(e.target.value)} required/>
            <input type="email" placeholder="Email address" className="formControl" onChange={(e) => setEmail(e.target.value)} required/>
            <input type="text" placeholder="Username"  className="formControl" onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" className="formControl"  onChange={(e) => setPassword(e.target.value)} required/>
            {
              firstName=="" || lastName=="" || email=="" || username=="" || password==""?  <button type="submit" disabled className="registerButtonDisabled" onClick={Register}> Get started</button>
              :
              <button type="submit" className="registerButton" onClick={Register}> Get started</button>
            }
           
            </div>
            </div>
            </form>
            

       
      
       
    </div>
  )
}
