import "./navbar.scss";
import logo from "../../images/logo.png";
import { ExitToAppSharp } from "@material-ui/icons";
import {HowToRegSharp} from "@material-ui/icons";
import { useState } from "react";
import {Navigate } from "react-router-dom"

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    window.onscroll = () =>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    if(login){
      return <Navigate to="/login"/>
    }

    if(register){
      return <Navigate to="/register"/>
    }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">
            <img src={logo} alt="" />
            <span>Home</span>
            <span>Today</span>
            <span>Premiere</span>
            <span>Movies</span>
            <span>Prices</span>
            <span>Reservations</span>
            </div>
            <div className="right">
            < ExitToAppSharp className="icon" onClick={()=> setLogin(true)} />
            <HowToRegSharp className="icon" onClick={()=> setRegister(true)} />
            </div>
        </div>
    </div>
  )
}

export default Navbar