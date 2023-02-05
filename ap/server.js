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
    const { email, password } = req.body

    await db.query('SELECT * FROM accounts WHERE email = $1', [email], async (err, result) => {
        if (result.rowCount > 0) {
            const user = result.rows[0]
            const hashed = user.password

            const validpass = await bcrypt.compare(password, hashed)

            if (validpass) {
                const accessToken = jwt.sign(email, 'secretkey')
                res.json({ accessToken: accessToken, user: { email: user.email, role: user.role, name: user.name }, auth: true })
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
    const { email, password, name } = req.body
    const role = 'USER'

    const hashpass = await bcrypt.hash(password, 10)

    await db.query('INSERT INTO accounts(email,password,name,role) VALUES($1,$2,$3,$4)', [email, hashpass, name, role], () => {
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