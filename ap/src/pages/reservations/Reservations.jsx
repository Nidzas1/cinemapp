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

    return (
        <>
            <h1>Welcome to reservations page,{account.username}</h1>
            <h1>YOUR RESERVATIONS:</h1><br />
            <button onClick={see}>see reservations</button>
            {reservations.map(res =>
            (
                <>

                    Movie: <h1>{res.title}</h1>
                    <img height='300px' width='250' src={res.image}></img>
                    Seat number:<h2>{res.seat_number}</h2>
                </>
            ))}
        </>
    )
}

export default Reservations