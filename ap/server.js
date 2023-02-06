const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const { validateToken } = require('./AuthMiddleware')
const bcrypt = require('bcrypt')

const { Client } = require('pg');

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

app.get('/allPrices', (req, res) => {
    db.query('select * from prices', (err, result) => {
        res.send(result.rows)
    })
})

app.post('/insertPrices', (req, res) => {

    const { category, price } = req.body

    db.query('INSERT INTO prices(category,price) VALUES($1,$2)', [category, price], () => {
        console.log("price inserted.")
    })
})

app.delete('/deletePrices/:id', (req, res) => {

    const id = req.params.id

    db.query('delete from prices where price_id = $1', [id], () => {
        console.log('price deleted.')
    })
})

app.post('/updatePrices/:id', (req, res) => {

    const id = req.params.id

    db.query('UPDATE prices(category,price) where price_id = $1', [id], () => {
        console.log('price updated.')
    })
})

app.get('/reservations/:username', (req, res) => {
    const username = req.params.username
    db.query('select users.first_name, movies.title,movies.image,reservations.seat_number,reservations.reservation_id from reservations inner join users on reservations.user_id = users.user_id inner join movies on reservations.movie_id = movies.movie_id where users.username = $1', [username], (err, result) => {
        res.send(result.rows)
    })
})

app.get('/premiere', (req, res) => {
    db.query('select * from movies where premiere = true', (err, result) => {
        try {
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)
        }
    })
})

app.listen(5000, () => {
    console.log('listening on 5k port')
})