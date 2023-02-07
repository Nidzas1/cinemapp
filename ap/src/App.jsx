import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Prices from "./pages/prices/Prices";
import Reservations from "./pages/reservations/Reservations";
import Movies from "./pages/movies/Movies";
import Premiere from "./pages/premiere/Premiere";
import Today from "./pages/today/Today"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/today" element={<Today />} />
                <Route path="/premiere" element={<Premiere />} />
                <Route path="/register" element={<Register />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movies" element={<Movies />} />
            </Routes>
        </Router>
    )
};

export default App;