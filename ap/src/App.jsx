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
import Movie from "./pages/movies/Movie";
import NewMovie from "./pages/movies/newMovie";


import AdminReservations from "./admin/reservations/Reservations";
import AdminGenres from "./admin/genres/Genres";
import AdminRooms from "./admin/reservations/Reservations";
import NewGenre from "./admin/genres/newGenre";

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
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/newMovie" element={<NewMovie />} />

                {/* ADMIN PAGES */}
                <Route path='/admin/reservations' element={<AdminReservations />} />
                <Route path='/admin/genres' element={<AdminGenres />} />
                <Route path='/admin/rooms' element={<AdminRooms />} />
                <Route path='/newGenre' element={<NewGenre />} />

            </Routes>
        </Router>
    )
};

export default App;