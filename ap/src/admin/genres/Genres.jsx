import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import '../../admin/genres/newGenre.scss'

const Genres = () => {

    const [genres, setGenres] = useState([])

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [show, setShow] = useState(true)


    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const showRes = () => {
        axios.get('http://localhost:5000/genres')
            .then(res => setGenres(res.data))
        setShow(false)
    }


    const deleteGenre = (genId) => {
        try {
            axios.delete(`http://localhost:5000/deleteGenre/${genId}`)
                .then(console.log(genId))
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
                        <h1>Welcome to Genres ADMIN page, {account.username}</h1>

                    </heading>

                    <div className="login-box">
                        {show ?
                            <form>
                                <a onClick={showRes}>SHOW ALL GENRES</a>
                            </form>
                            :
                            <h1></h1>
                        }
                        {genres.map(res =>
                        (
                            <>
                                <form>
                                    <div className='user-box'>
                                        <h2 style={{ marginTop: '20px' }}>GenreID: {res.genre_id}</h2>
                                    </div>
                                    <h2>Genre: {res.genre}</h2>
                                    <a onClick={() => deleteGenre(res.genre_id)}>DELETE GENRE</a>
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

export default Genres