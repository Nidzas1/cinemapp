import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../movies/movie.scss'
import Navbar from "../../components/navbar/Navbar";
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
    const [genres, setGenres] = useState([])
    const [rooms, setRooms] = useState([])
    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)
    const[message, setMessage] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/movie/' + id)
            .then(res => res.json())
            .then(data => setMovie(data))
            
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/movie/' + id)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
                setTitle(data[0].title)
                setYear(data[0].year)
                setDescription(data[0].description)
                setImage(data[0].image)
                setDuration(data[0].duration)
                setPremiere(data[0].premiere)
                setShowing(data[0].showing)
                setTimePlaying(data[0].time_playing)
                setGenreId(data[0].genre_id)
                setRoomId(data[0].room_id)
    })
            console.log(title, year, description, image, duration, premiere, showing, timePlaying, genreId, roomId)
    }, [])

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
            window.location.reload(false);
            
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
         <Navbar />
            {auth && account.role === 'ADMIN'?
                <div className='movie'>
                   
                    {movie.map(m => (
                        <div className="box">
                            <h2>{message}</h2>
                            <h2>{m.title}</h2>
                            <form>
                                <div className="info-box">
                                    
                                    <input type="text"  onChange={e => setTitle(e.target.value)} defaultValue={m.title}/>
                                    <label>Title </label>
                                </div>
                                <div className="info-box">
                                    <input type="number" onChange={e => setYear(e.target.value)} defaultValue={m.year}/>
                                    <label>Year</label>
                                </div>
                                <div className="info-box">
                                    <input type="text" onChange={e => setDescription(e.target.value)} defaultValue={m.description}/>
                                    <label>Description</label>
                                </div>
                                <div className="info-box">
                                    <input type="text" onChange={e => setImage(e.target.value)} defaultValue={m.image}/>
                                    <label>Image</label>
                                </div>
                                <div className="info-box">
                                    <input type="text" onChange={e => setDuration(e.target.value)} defaultValue={m.duration}/>
                                    <label>Duration</label>
                                </div>
                                <div className="info-box">
                                    <div className="radioButtons" onChange={e => setPremiere(e.target.value)} >
                                        <input type="radio" value="true" name="premiere" /> Premiere
                                        <input type="radio" value="false" name="premiere" /> Not premiere
                                    </div>
                                    <label style={{fontSize: 12}} >Premiere</label>
                                </div>
                                <div className="info-box">
                                    <input type="date" className='date' onChange={e => setShowing(e.target.value)} />
                                   <label>Showing </label>
                                </div>
                                <div className="info-box">
                                    <input type="time" className='time' onChange={e => setTimePlaying(e.target.value)} defaultValue={m.time_playing}/>
                                    <label>Time playing</label>
                                </div>
                                <div className="info-box">
                                    <select onChange={(e)=>{setGenreId(e.target.value)}}  >
                                    {genres.map((genre) =>
                                        <option value={genre.genre_id}>{genre.genre}</option>
                                      
                                    )}
                                    </select>
                                    
                                    <label style={{fontSize: 12}} >Genre</label>
                                </div>
                                <div className="info-box">
                                    <select onChange={(e)=>{setRoomId(e.target.value)}} >
                                    {rooms.map((room) =>
                                        <option value={room.room_id}>{room.room_number}</option>
                                    )}
                                    </select>
                                    <label style={{fontSize: 12}} >Room</label>
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
                :
                <div className='movie'>

                    <h2 style={{
                        color: 'white',
                        textAlign:'center',
                        paddingTop: '150px'


                    }}>YOU'RE UNAUTHORIZED TO VIEW THIS PAGE.<br/></h2>
                </div>
            }

        </>

    )
}

export default Movie