import "./navbar.scss";
import logo from "../../images/logo.png";
import { ExitToAppSharp, KeyboardReturnTwoTone } from "@material-ui/icons";
import { HowToRegSharp } from "@material-ui/icons";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [account, setAccount] = useState('');
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const [home, setHome] = useState(false)
  const [today, setToday] = useState(false);
  const [premiere, setPremiere] = useState(false);
  const [movies, setMovies] = useState(false);
  const [prices, setPrices] = useState(false);
  const [reservations, setReservations] = useState(false);

  useEffect(() => {
    setAuth(sessionStorage.getItem('auth'))
    setAccount(JSON.parse(sessionStorage.getItem('user')))
  }, [])

  const logout = () => {
    sessionStorage.clear();
     window.location.reload(false);
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  if(home){
    return <Navigate to="/"/>
  }
  if (login) {
    return <Navigate to="/login" />
  }

  if (register) {
    sessionStorage.clear()
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
          <span onClick={() => setHome(true)}>Home</span>
          <span onClick={() => setToday(true)}>Today</span>
          <span onClick={() => setPremiere(true)}>Premiere</span>
          <span onClick={() => setMovies(true)}>Movies</span>
          <span onClick={() => setPrices(true)}>Prices</span>
          <span onClick={() => setReservations(true)}>Reservations</span>
        </div>
        <div className="right">
          {auth? <KeyboardReturnTwoTone className="icon"  onClick={logout}/>
          :< ExitToAppSharp className="icon" onClick={() => setLogin(true)} />
          }
          <HowToRegSharp className="icon" onClick={() => setRegister(true)} />
        </div>
      </div>
    </div>
  )
}

export default Navbar