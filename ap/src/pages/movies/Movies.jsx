import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./movies.scss"
import format from 'date-fns/format'
import { Navigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar";
const Movies = () => {

    const [movies, setMovies] = useState([])
    const [newMovie, setNewMovie] = useState(false)

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [number, setNumber] = useState('')

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [duration, setDuration] = useState('')
    const [premiere, setPremiere] = useState('')
    const [showing, setShowing] = useState('')
    const [timePlaying, setTimePlaying] = useState('')
    const [genreId, setGenreId] = useState('')
    const [roomId, setRoomId] = useState('')

   

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [])

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const insertMovie = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:5000/insertMovies', {
                title: title,
                year: year,
                description: description,
                image: image,
                duration: duration,
                premiere: premiere,
                showing: showing,
                timePlaying: timePlaying,
                genre_id: genreId,
                room_id: roomId
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const updateMovie = (movieId) => {
        try {
            axios.delete(`http://localhost:5000/updateMovies/${movieId}`, {
                title: title,
                year: year,
                description: description,
                image: image,
                duration: duration,
                premiere: premiere,
                showing: showing,
                timePlaying: timePlaying,
                genre_id: genreId,
                room_id: roomId
            })
        }
        catch (err) {
            console.log(err)
        }
    }

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
    }

    if(newMovie){
        return (
         <Navigate to="/newMovie"/>
        )
     }
    return (
        <>
        <div className='movies'>
            <Navbar />
            {auth && account.role === 'ADMIN' ?
                <>
                    <div className="insert">
                    <button className='button' onClick={() => setNewMovie(true)}>INSERT NEW MOVIE</button>
                    </div>
                    <div className="cards">
                    {movies.map(movie => (
                        <>
                            <div className="card" onClick={() => updateMovie(movie.movie_id)}>
                            <h2 className="card-title">{movie.title}</h2>
                            <img src={movie.image} alt=""/>
                            <p className="card-desc">
                                Year: {movie.year}<br/><br/>
                                Showing: {format(new Date(movie.showing), 'dd MMMM yyyy')} <br/><br/>
                                {movie.description}<br/><br/>
                                Duration: {movie.duration}<br/><br/></p>
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
                :
                <>
                <div className="cards">
                    {movies.map(movie => (
                        <>
                              <div className="card">
                            <h2 className="card-title">{movie.title}</h2>
                            <img src={movie.image} alt=""/>
                            <p class="card-desc">
                                Year: {movie.year}<br/><br/>
                                Showing: {format(new Date(movie.showing), 'dd MMMM yyyy')} <br/><br/>
                                {movie.description}<br/><br/>
                                Duration: {movie.duration}<br/><br/></p>
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
            }
        </div>
        </>

    )
}

export default Movies