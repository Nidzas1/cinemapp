import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./movies.scss"
import format from 'date-fns/format'
import { Navigate, Link } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
const Movies = () => {

    const [movies, setMovies] = useState([])

    const [newMovie, setNewMovie] = useState(false)

    const [message, setMessage] = useState('')

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [number, setNumber] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [])

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])


    const deleteMovie = (movieId) => {

        try {
            axios.delete(`http://localhost:5000/deleteMovies/${movieId}`)
                .then(console.log(movieId))
        }
        catch (err) {
            console.log(err)
        }
    }

    const reserve = (movieId) => {
        axios.post(`http://localhost:5000/reserve/${movieId}`, {
            seatNum: number,
            userId: account.userId
        })
            .catch((err) => {
                setMessage(err.request.response)
            })
    }

    if (newMovie) {
        return (
            <Navigate to="/newMovie" />
        )
    }

    return (
        <>
            <div className='movies'>
                < Navbar />
                {auth && account.role === 'ADMIN' ?
                    <>
                        <div className="insert">
                            <button className='button' onClick={() => setNewMovie(true)}>INSERT NEW MOVIE</button>
                        </div>
                        <div className="cards">
                            {movies.map(movie => (
                                <>
                                    <div className="card">
                                        <h2 className="card-title">{movie.title}</h2>
                                        <img src={movie.image} alt="" />
                                        <Link className='link' to={`/movie/${movie.movie_id}`}><p className="card-desc">
                                            Year: {movie.year}<br /><br />
                                            Showing: {format(new Date(movie.showing), 'dd MMMM yyyy')} <br /><br />
                                            {movie.description}<br /><br />
                                            Duration: {movie.duration}<br /><br /></p></Link>
                                        <h4>Insert number of seat:</h4>

                                        <input type='text' placeholder='Number of seat' onChange={e => setNumber(e.target.value)} className="formControl" />
                                        <div className="buttons">
                                            <button className='button' onClick={() => reserve(movie.movie_id)}>RESERVE</button>
                                            <button className='button' onClick={() => deleteMovie(movie.movie_id)}>DELETE</button>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                    : auth && account.role === 'USER' ?
                        <>
                            <div className="cards">
                                {movies.map(movie => (
                                    <>
                                        <div className="card">
                                            <h1>{message}</h1>
                                            <h2 className="card-title">{movie.title}</h2>
                                            <img src={movie.image} alt="" />
                                            <p className="card-desc">
                                                Year: {movie.year}<br /><br />
                                                Showing: {format(new Date(movie.showing), 'dd MMMM yyyy')} <br /><br />
                                                {movie.description}<br /><br />
                                                Duration: {movie.duration}<br /><br /></p>
                                            <h4>Insert number of seat:</h4>
                                            <input type='text' placeholder='Number of seat' onChange={e => setNumber(e.target.value)} className="formControl" />
                                            <div className="buttons">
                                                <button className="button" onClick={() => reserve(movie.movie_id)}>RESERVE</button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                        :
                        <>
                            <div className="cards">
                                {movies.map(movie => (
                                    <>
                                        <div className="card">
                                            <h2 className="card-title">{movie.title}</h2>
                                            <img src={movie.image} alt="" />
                                            <p className="card-desc">
                                                Year: {movie.year}<br /><br />
                                                Showing: {format(new Date(movie.showing), 'dd MMMM yyyy')} <br /><br />
                                                {movie.description}<br /><br />
                                                Duration: {movie.duration}<br /><br /></p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                }
            </div >
        </>

    )
}

export default Movies