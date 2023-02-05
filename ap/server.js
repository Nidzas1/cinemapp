const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const { validateToken } = require('./AuthMiddleware')
const bcrypt = require('bcrypt')

const { Client } = require('pg')

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Biologija1`',
    database: 'postgres'
})

db.connect()
app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    await db.query('SELECT * FROM users WHERE username = $1', [username], async (err, result) => {
        if (result.rowCount > 0) {
            const user = result.rows[0]
            const hashpass = user.password

            const validpass = await bcrypt.compare(password, hashpass)

            if (validpass) {
                const accessToken = jwt.sign(username, 'secretkey')
                res.json({ accessToken: accessToken, user: { username: user.username, role: user.role, username: user.username }, auth: true })
                console.log('user logged in.')
            }
            else {
                console.log('no')
            }
        }
        else {
            console.log('wrong email.')
        }
    })
})

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body
    
    const role = 'USER'
    
    const hashpass = await bcrypt.hash(password, 10)
    
    await db.query('INSERT INTO users(first_name,last_name,email,username,password,role) VALUES($1,$2,$3,$4,$5,$6)', [firstName, lastName, email, username, hashpass, role], () => {
        console.log('user inserted into database.')
    })
})

app.get('/accounts', validateToken, (req, res) => {
    db.query('SELECT * FROM accounts', (err, result) => {
        res.send(result.rows)
    })
})


app.listen(5000, () => {
    console.log('listening on 5k port')
})