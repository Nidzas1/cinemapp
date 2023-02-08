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
        
        <div class="cards">
        

        {premiere.map(premiere => (
            <>

            <div class="card">
              <h1>{premiere.genre}</h1>
                <h2 class="card-title">{premiere.title}</h2>
                <img src={premiere.image} alt=""/>
                <p class="card-desc">{premiere.description} <br/><br/>Premiere: <br/>
                {format(new Date(premiere.showing), 'dd MMMM yyyy')}</p>
        </div>
    
  </>
        ))}
</div>   
</div> 
  )
}

export default Premiere