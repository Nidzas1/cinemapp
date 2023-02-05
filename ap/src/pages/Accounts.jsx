import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Accounts = () => {

    const [account, setAccount] = useState()

    const [auth, setAuth] = useState(false)

    const history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:5000/accounts', {
            headers: {
                accessToken: sessionStorage.getItem('accessToken'),
            }
        }).then(() => {
            setAuth(sessionStorage.getItem('auth'))
            setAccount(JSON.parse(sessionStorage.getItem('user')))
        })
    }, [])

    const logout = () => {
        sessionStorage.clear()
        history.push('/')
    }


    return (
        <div>
            {auth && account.role === 'USER' ?
                <div>
                    <h1>You can view this page</h1>
                    <h2>Welcome {account.email} </h2>
                    <h3>Your name is: {account.name}</h3>
                    <button onClick={logout}>Logout</button>
                </div>
                :
                <h1>You're unauthenticated to view this page. Please login.</h1>}
        </div>
    )
}

export default Accounts