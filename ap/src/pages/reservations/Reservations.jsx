import { ConstructionSharp } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import '../reservations/reservations.scss'

const Reservations = () => {

    const [reservations, setReservations] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [message, setMessage] = useState('')

    const [show, setShow] = useState(true)


    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const showRes = () => {
        axios.get('http://localhost:5000/reservations/' + account.username)
            .then(res => setReservations(res.data))
        setShow(false)

    }


    const deleteRes = (resId) => {
        try {
            axios.delete(`http://localhost:5000/deleteReservation/${resId}`)
                .then(res => setMessage(res.data.message))
                window.location.reload(false);
        }
        catch (err) {
            setMessage(err.request.response)
        }
    }

    return (
        <>
            {auth ?
                <div className='reservations'>
                    <Navbar />
                    <heading>
                        <h1>Welcome to reservations page,{account.username}</h1>
                        <h1>{message}</h1>

                    </heading>

                    <div className="login-box">
                        {show ?
                            <form>
                                <a onClick={showRes}>SHOW MY RESERVATIONS</a>
                            </form>
                            :
                            <h1></h1>
                        }
                        {reservations.map(res =>
                        (
                            <>
                                <form>
                                    <div className='user-box'>
                                        <h2 style={{ marginTop: '20px' }}>Your Reservation number: {res.reservation_id}</h2>
                                    </div>
                                    <h2>Movie: {res.title}</h2>
                                    <img height='250' width='170' src={res.image}></img>
                                    <h2>Seat number: {res.seat_number}</h2>
                                    <a onClick={() => deleteRes(res.reservation_id)}>DELETE RES</a>
                                    <hr />
                                </form>
                            </>
                        ))}
                    </div>
                </div>
                : <div className='reservations'>
                    <h2 style={{
                        color: 'white',
                        textAlign: 'center',
                        paddingTop: '150px'
                    }}>PLEASE LOGIN TO VIEW THIS PAGE.<br /></h2>
                    <h2 style={{ textAlign: 'center' }}><a style={{ color: 'white' }} href='/login'>Login</a></h2>
                </div>
            }
        </>
    )
}

export default Reservations