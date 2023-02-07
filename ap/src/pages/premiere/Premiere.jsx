import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Premiere = () => {

    const [premiere, setPremiere] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/premiere')
            .then(res => res.json())
            .then(data => setPremiere(data))
    }, [])

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])


  return (
    <div>
        {premiere.map(p => (
            <>
                <h1>{p.title}</h1>
            </>
        ))}
    </div>
  )
}

export default Premiere