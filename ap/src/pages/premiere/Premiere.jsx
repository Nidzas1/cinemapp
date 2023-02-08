import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar";
import "./premiere.scss"
import format from 'date-fns/format'
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
    
    <div className='premiere'>
        <Navbar/>
        
        <div className="cards"> 
        {premiere.map(premiere => (
            <>
            <div className="card">
                <h2 className="card-title">{premiere.title}</h2>
                <h4 className='card-date'>{format(new Date(premiere.showing), 'dd MMMM yyyy')}</h4>
                <img src={premiere.image} alt=""/>
                <p className="card-desc"><h4 className='card-genre'>{premiere.genre}</h4>
                {premiere.description}
                </p>
        </div>
    
  </>
        ))}
</div>   
</div> 
  )
}

export default Premiere