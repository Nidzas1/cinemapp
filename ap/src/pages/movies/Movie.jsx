import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../movies/movie.scss'

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
            <div className='movie'>
                {movie.map(m => (
                    <div className="login-box">
                        <h2>{m.title}</h2>
                        <img src={`${m.image}`} />
                        <form>
                            <div className="user-box">
                                <input type="text" onChange={e => setTitle(e.target.value)} />
                                <label>Title</label>
                            </div>
                            <div className="user-box">
                                <input type="number" onChange={e => setYear(e.target.value)} />
                                <label>Year</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setDescription(e.target.value)} />
                                <label>Description</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setImage(e.target.value)} />
                                <label>Image</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setDuration(e.target.value)} />
                                <label>Duration</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setPremiere(e.target.value)} />
                                <label>Premiere</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setShowing(e.target.value)} />
                                <label>Showing</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setTimePlaying(e.target.value)} />
                                <label>Time playing</label>
                            </div>
                            <div className="user-box">
                                <input type="text" onChange={e => setGenreId(e.target.value)} />
                                <label>Genre</label>
                            </div>

                            <div className="user-box">
                                <input type="text" onChange={e => setRoomId(e.target.value)} />
                                <label>Room</label>
                            </div>
                            <a onClick={() => updateMovie(m.movie_id)}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Update
                            </a>
                        </form>
                    </div>

                ))}
            </div>

        </>

    )
}

export default Movie