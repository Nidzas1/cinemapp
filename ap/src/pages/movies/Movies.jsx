import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Movies = () => {

    const [movies, setMovies] = useState([])

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

    const reserve = (movieId) => {
        axios.post(`http://localhost:5000/reserve/${movieId}`, {
            seatNum: number,
            userId: account.userId
        })
    }

    return (
        <>
            {movies.map(movie => (
                <>
                    <h1>{movie.title}</h1>
                    <h2>{movie.movie_id}</h2>
                    <input type='text' onChange={e => setNumber(e.target.value)} />
                    <button onClick={() => reserve(movie.movie_id)}>RESERVE</button>
                </>
            ))}
        </>
    )
}

export default Movies