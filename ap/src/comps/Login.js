import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const Login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
            .then(response => {
                sessionStorage.setItem('accessToken', response.data.accessToken)
                sessionStorage.setItem('auth', response.data.auth)
                sessionStorage.setItem('user', JSON.stringify(response.data.user))
            })
            .then(() => {
                history.push('/accounts')
            })
    }
    return (
        <div>
            <form>
                <input type='text' onChange={(e) => setEmail(e.target.value)} />
                <input type='text' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={Login}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Login