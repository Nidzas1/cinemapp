import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Movies = () => {

    const [movies, setMovies] = useState([])

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

    return (
        <>
            {auth && account.role === 'ADMIN' ?
                <>
                    <form>
                        Title<input type="text" onChange={e => setTitle(e.target.value)} />
                        setYear<input type="text" onChange={e => setYear(e.target.value)} />
                        setDescription<input type="text" onChange={e => setDescription(e.target.value)} />
                        setImage<input type="text" onChange={e => setImage(e.target.value)} />
                        setDuration<input type="text" onChange={e => setDuration(e.target.value)} />
                        setPremiere<input type="text" onChange={e => setPremiere(e.target.value)} />
                        setShowing<input type="text" onChange={e => setShowing(e.target.value)} />
                        setTimePlaying<input type="text" onChange={e => setTimePlaying(e.target.value)} />
                        setGenreId<input type="text" onChange={e => setGenreId(e.target.value)} />
                        setRoomId<input type="text" onChange={e => setRoomId(e.target.value)} />
                        <button onClick={insertMovie}>Insert</button>
                    </form>
                    {movies.map(movie => (
                        <>
                            <h1>{movie.title}</h1>
                            <h2>{movie.movie_id}</h2>
                            <input type='text' onChange={e => setNumber(e.target.value)} />
                            <button onClick={() => reserve(movie.movie_id)}>RESERVE</button>
                            <button onClick={() => deleteMovie(movie.movie_id)}>DELETE</button>
                        </>
                    ))}
                </>
                :
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
            }
        </>

    )
}

export default Movies