import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./newMovies.scss"
import Navbar from "../../components/navbar/Navbar";

const NewMovie = () => {

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

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

    const [genres, setGenres] = useState([])
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/genres')
            .then(res => res.json())
            .then(data => setGenres(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
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
            console.log(title, year, description, image, duration, premiere, showing, genreId, roomId)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='newMovies'>
                <Navbar />
                {auth && account.role === 'ADMIN' ?
                    <>
                        <div className="box">
                            <h2>New movie</h2>
                           
                            <form>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setTitle(e.target.value)} />
                                    <label>Title</label>
                                </div>
                                <div className="movie-box">
                                    <input type="number" onChange={e => setYear(e.target.value)} />
                                    <label>Year</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setDescription(e.target.value)} />
                                    <label>Description</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setImage(e.target.value)} />
                                    <label>Image</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setDuration(e.target.value)} />
                                    <label>Duration</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setPremiere(e.target.value)} />
                                    <label>Premiere</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setShowing(e.target.value)} />
                                    <label>Showing</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setTimePlaying(e.target.value)} />
                                    <label>Time playing</label>
                                </div>
                                <div className="movie-box">
                                    <select onChange={(e)=>{setGenreId(e.target.value)}}>
                                    {genres.map((genre) =>
                                        <option value={genre.genre_id}>{genre.genre}</option>
                                    )}
                                    </select>
                                    <label style={{fontSize: 12}} >Genre</label>
                                </div>
                                <div className="movie-box">
                                    <select onChange={(e)=>{setRoomId(e.target.value)}}>
                                    {rooms.map((room) =>
                                        <option value={room.room_id}>{room.room_number}</option>
                                    )}
                                    </select>
                                    <label style={{fontSize: 12}} >Room</label>
                                </div>
                                {title=="" || year=="" || description=="" || image=="" || duration=="" || premiere=="" || showing=="" || timePlaying=="" ?
                                <a >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Add all informations
                            </a>
                            :
                            <a onClick={insertMovie}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Insert
                        </a>
                            }
                                
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <h1>You can't change this page</h1>
                    </>
                }
                                
            </div>
        </>

    )
}

export default NewMovie