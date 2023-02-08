import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./today.scss"
import Navbar from "../../components/navbar/Navbar";
import format from 'date-fns/format'
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
      
    <div className='today'>
    <Navbar/>
    <div class="cards">
    
    {today.map(t => (
        <>
        <div class="card">
            <h2 class="card-title">{t.title}</h2>
            <img src={t.image} alt=""/>
            <p class="card-desc">
            Date:<br/>
            {format(new Date(t.showing), 'dd MMMM yyyy')}
            <br/><br/>Time: <br/> {t.time_playing}
            <br/><br/>Room number: <br/> {t.room_number}
            <br/><br/>{t.description}</p>
        </div>

        </>
    ))}
</div>   
</div> 
    )
    
}

export default Showing