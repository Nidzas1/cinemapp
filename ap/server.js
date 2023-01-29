const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const { validateToken } = require('./AuthMiddleware')

const { Client } = require('pg')

const db = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'postgres'
})

db.connect()
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    const { email } = req.body
    db.query('SELECT * FROM accounts WHERE email = $1', [email], (err, result) => {

        if (result.rowCount > 0) {
            const user = result.rows[0]
            console.log('welcome user')

            const accessToken = jwt.sign(email, 'secretkey')
            res.json({ accessToken: accessToken, user: { email: user.email, role: user.role, name: user.name }, auth: true })
        }
        else {
            console.log('wrong email.')
        }

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