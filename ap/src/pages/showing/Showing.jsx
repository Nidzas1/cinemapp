import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Showing = () => {

    const [today, setToday] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/today')
            .then(res => res.json())
            .then(data => setToday(data))
    }, [])

    return (
        <>
            {today.map(t => (
                <>
                    <h1>{t.duration}</h1>
                    <h2>{t.movie_id}</h2>
                </>
            ))}
        </>
    )
}

export default Showing