import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar";

const NewGenre = () => {

    const [account, setAccount] = useState('')
    const [auth, setAuth] = useState(false)

    const [genre, setGenre] = useState('')

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const insertGenre = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:5000/insertGenre', {
                genre: genre,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='newMovies'>
                <Navbar />
                {auth && account.role === 'ADMIN' ?
                    <>
                        <div className="box">
                            <h2>New genre</h2>
                            <form>
                                <div className="movie-box">
                                    <input type="text" onChange={e => setGenre(e.target.value)} />
                                    <label>Genre</label>
                                </div>
                                :
                                <a onClick={insertGenre}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Insert
                                </a>
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <h1>You can't change this page</h1>
                    </>
                }

            </div>
        </>

    )
}

export default NewGenre