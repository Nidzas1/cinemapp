import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import '../../admin/reservations/reservations.scss'

const Reservations = () => {

    const [reservations, setReservations] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [show, setShow] = useState(true)


    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const showRes = () => {
        axios.get('http://localhost:5000/admin/reservations')
            .then(res => setReservations(res.data))
        setShow(false)
    }


    const deleteRes = (resId) => {
        try {
            axios.delete(`http://localhost:5000/deleteReservation/${resId}`)
                .then(console.log(resId))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {auth && account.role === 'ADMIN' ?
                <div className='reservations'>
                    <Navbar />
                    <heading>
                        <h1>Welcome to reservations ADMIN page, {account.username}</h1>

                    </heading>

                    <div className="login-box">
                        {show ?
                            <form>
                                <a onClick={showRes}>SHOW ALL RESERVATIONS</a>
                            </form>
                            :
                            <h1></h1>
                        }
                        {reservations.map(res =>
                        (
                            <>
                                <form>
                                    <div className='user-box'>
                                        <h2 style={{ marginTop: '20px' }}>Reservation number: {res.reservation_id}</h2>
                                    </div>
                                    <h2>Movie: {res.title}</h2>
                                    <img height='250' width='170' src={res.image}></img>
                                    <h2>Seat number: {res.seat_number}</h2>
                                    <a onClick={() => deleteRes(res.reservation_id)}>DELETE RES</a>
                                    <h3>Firstname: {res.first_name} </h3>
                                    <h3>Lastname: {res.last_name}</h3>
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
                    }}>YOU'RE UNAUTHORIZED TO VIEW THIS PAGE.<br />
                        <a style={{ color: 'white' }} href='/'>RETURN TO HOME PAGE</a></h2>
                </div>
            }
        </>
    )
}

export default Reservations