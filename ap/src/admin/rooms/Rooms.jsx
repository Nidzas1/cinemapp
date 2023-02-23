import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import '../../admin/rooms/rooms.scss'
import { Navigate, Link } from "react-router-dom"
const Rooms = () => {

    const [rooms, setRooms] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [show, setShow] = useState(true)
    const[newRooms, setNewRooms] = useState(false)

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const showRes = () => {
        axios.get('http://localhost:5000/rooms')
            .then(res => setRooms(res.data))
        setShow(false)
    }


    const deleteRoom = (roId) => {
        try {
            axios.delete(`http://localhost:5000/deleteRoom/${roId}`)
                .then(console.log(roId))
                window.location.reload(false);
        }
        catch (err) {
            console.log(err)
        }
    }

    if (newRooms) {
        return (
            <Navigate to="/admin/newRoom" />
        )
    }
    return (
        <>
            {auth && account.role === 'ADMIN' ?
                <div className='room'>
                    <Navbar />
                    <heading>
                        <h1>Welcome to rooms ADMIN page, {account.username}</h1>

                    </heading>
                    <div className="insert">
                            <button className='button' onClick={() => setNewRooms(true)}>INSERT NEW ROOM</button>
                        </div>
                    <div className="room-box">
                        {show ?
                            <form>
                                <a onClick={showRes}>SHOW ALL ROOMS</a>
                            </form>
                            :
                            <h1></h1>
                        }
                        {rooms.map(res =>
                        (
                            <>
                                <form>
                                    <div className='user-box'>
                                        <h2 style={{ marginTop: '20px' }}>Room Id: {res.room_id}</h2>
                                    </div>
                                    <h2>Room number: {res.room_number}</h2>
                                    <h2>Number of seats: {res.seat_number}</h2>
                                    <a onClick={() => deleteRoom(res.room_id)}>DELETE ROOM</a>
                                    <hr />
                                </form>
                            </>
                        ))}
                    </div>
                </div>
                : <div className='room'>
                    <h2 style={{
                        color: 'white',
                        textAlign: 'center',
                        paddingTop: '150px'
                    }}>YOU'RE UNAUTHORIZED TO VIEW THIS PAGE.<br />
                        <a style={{ color: 'white' }} href='/'>RETURN TO HOME PAGE</a></h2>
                </div>
            }
        </>
    )
}

export default Rooms