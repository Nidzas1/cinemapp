import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const history = useHistory()

    const Login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/register', {
            email: email,
            password: password,
            name: name
        })
            .then(() => {
                history.push('/login')
            })
    }
    return (
        <div>
            <form>
                <input type='text' onChange={(e) => setEmail(e.target.value)} />
                <input type='text' onChange={(e) => setPassword(e.target.value)} />
                <input type='text' onChange={(e) => setName(e.target.value)} />
                <button onClick={Login}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Register