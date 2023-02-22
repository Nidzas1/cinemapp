import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar";

const NewRoom = () => {

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [roomNum, setRoomNum] = useState('')
    const [seatNum, setSeatNum] = useState('')

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const insertRoom = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:5000/insertRoom', {
                roomNum: roomNum,
                seatNum: seatNum
            })
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
                            <h2>New Room</h2>
                            <form>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setRoomNum(e.target.value)} />
                                    <label>Room number</label>
                                </div>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setSeatNum(e.target.value)} />
                                    <label>Seat Number</label>
                                </div>
                                :
                                <a onClick={insertRoom}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Insert
                                </a>
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

export default NewRoom