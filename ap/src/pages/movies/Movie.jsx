import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {

    const { id } = useParams()

    const [movie, setMovie] = useState([])

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
        fetch('http://localhost:5000/movie/' + id)
            .then(res => res.json())
            .then(data => setMovie(data))
    }, [])

    const updateMovie = (movieId) => {
        try {
            axios.post(`http://localhost:5000/movie/update/${movieId}`, {
                title: title,
                year: year,
                description: description,
                image: image,
                duration: duration,
                premiere: premiere,
                showing: showing,
                timePlaying: timePlaying,
                genreId: genreId,
                roomId: roomId,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            {movie.map(m => (
                <div>
                    <form>
                        <h1>{m.title}</h1>
                        setTitle<input type="text" onChange={e => setTitle(e.target.value)} />
                        setYear<input type="text" onChange={e => setYear(e.target.value)} />
                        setDescription<input type="text" onChange={e => setDescription(e.target.value)} />
                        setImage<input type="text" onChange={e => setImage(e.target.value)} />
                        setDuration<input type="text" onChange={e => setDuration(e.target.value)} />
                        setPremiere<input type="text" onChange={e => setPremiere(e.target.value)} />
                        setShowing<input type="text" onChange={e => setShowing(e.target.value)} />
                        setTimePlaying<input type="text" onChange={e => setTimePlaying(e.target.value)} />
                        setGenreId<input type="text" onChange={e => setGenreId(e.target.value)} />
                        setRoomId<input type="text" onChange={e => setRoomId(e.target.value)} />
                        <button onClick={() => updateMovie(m.movie_id)}>UPDATE</button>
                    </form>
                </div>
            ))}

        </>
    )
}

export default Movie