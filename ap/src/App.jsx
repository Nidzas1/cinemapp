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
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </Router>
    )
};

export default App;