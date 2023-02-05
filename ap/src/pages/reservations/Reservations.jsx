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
            <button onClick={see}>see reservations</button>
            {reservations.map(res =>
            (
                <>
                    <h1>{res.seat_number}</h1>
                </>
            ))}
        </>
    )
}

export default Reservations