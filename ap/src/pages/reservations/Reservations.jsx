import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Reservations = () => {

    const [reservations, setReservations] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const see = () => {
        const username = account.username
        axios.get(`http://localhost:5000/reservations/${username}`)
            .then(res => setReservations(res.data))
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
            <h1>Welcome to reservations page,{account.username}</h1>
            <h1>YOUR RESERVATIONS:</h1><br />
            <button onClick={see}>see reservations</button>
            {reservations.map(res =>
            (
                <>
                    reservation_id: <h1>{res.reservation_id}</h1>
                    Movie: <h1>{res.title}</h1>
                    <img height='300px' width='250' src={res.image}></img>
                    Seat number:<h2>{res.seat_number}</h2>
                    <button onClick={() => deleteRes(res.reservation_id)}>DELETE RES</button>
                </>
            ))}
        </>
    )
}

export default Reservations