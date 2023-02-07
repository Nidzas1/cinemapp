import "./navbar.scss";
import logo from "../../images/logo.png";
import { ExitToAppSharp } from "@material-ui/icons";
import { HowToRegSharp } from "@material-ui/icons";
import { useState } from "react";
import { Navigate } from "react-router-dom"

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const [home, setHome] = useState(false)
  const [today, setToday] = useState(false);
  const [premiere, setPremiere] = useState(false);
  const [movies, setMovies] = useState(false);
  const [prices, setPrices] = useState(false);
  const [reservations, setReservations] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  if (login) {
    return <Navigate to="/login" />
  }

  if (register) {
    return <Navigate to="/register" />
  }

  if (today) {
    return <Navigate to="/today" />
  }

  if (premiere) {
    return <Navigate to="/premiere" />
  }

  if (movies) {
    return <Navigate to="/movies" />
  }

  if (prices) {
    return <Navigate to="/prices" />
  }

  if (reservations) {
    return <Navigate to="/reservations" />
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={logo} alt="" />
          <span>Home</span>
          <span onClick={() => setToday(true)}>Today</span>
          <span onClick={() => setPremiere(true)}>Premiere</span>
          <span onClick={() => setMovies(true)}>Movies</span>
          <span onClick={() => setPrices(true)}>Prices</span>
          <span onClick={() => setReservations(true)}>Reservations</span>
        </div>
        <div className="right">
          < ExitToAppSharp className="icon" onClick={() => setLogin(true)} />
          <HowToRegSharp className="icon" onClick={() => setRegister(true)} />
        </div>
      </div>
    </div>
  )
}

export default Navbar