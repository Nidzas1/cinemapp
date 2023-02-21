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
                res.json({ accessToken: accessToken, user: { username: user.username, role: user.role, username: user.username, userId: user.user_id }, auth: true })
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
    await db.query('SELECT * FROM USERS WHERE email = $1', [email], (err, result) => {
        if (result.rowCount > 0) {
            res.status(400).send('user already exists')
        }
        else {
            db.query('INSERT INTO users(first_name,last_name,email,username,password,role) VALUES($1,$2,$3,$4,$5,$6)', [firstName, lastName, email, username, hashpass, role], () => {
                console.log('user inserted into database.')
            })
        }
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

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        res.send(result.rows)
    })
})

app.post('/insertMovies', (req, res) => {

    const { title, year, description, image, duration, premiere, showing, timePlaying, genre_id, room_id } = req.body

    db.query('INSERT INTO movies(title,year,description,image,duration,premiere,showing,time_playing,genre_id,room_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [title, year, description, image, duration, premiere, showing, timePlaying, genre_id, room_id], () => {
        console.log("Movie inserted.")
    })
})

app.post('/movie/update/:movieId', (req, res) => {

    const movieId = req.params.movieId

    const { title, year, description, image, duration, premiere, showing, timePlaying, genreId, roomId } = req.body

    db.query('UPDATE movies SET title = $1, year = $2, description = $3, image = $4, duration = $5, premiere = $6, showing = $7, time_playing = $8, genre_id = $9, room_id = $10 where movie_id = $11', [title, year, description, image, duration, premiere, showing, timePlaying, genreId, roomId, movieId], (err, result) => {
        console.log('updated')
    })
})

app.get('/movie/:id', (req, res) => {

    const id = req.params.id

    db.query('SELECT * FROM movies where movie_id = $1', [id], (err, result) => {
        res.send(result.rows)
    })
})

app.delete('/deleteMovies/:movieId', (req, res) => {

    const movieId = req.params.movieId
    console.log(movieId)
    db.query('delete from movies where movie_id = $1', [movieId], () => {
        console.log("Movie deleted.")
    })
})

app.post('/reserve/:movieId', (req, res) => {

    const movieId = req.params.movieId

    const { seatNum, userId } = req.body
    db.query('insert into reservations(seat_number,user_id,movie_id) values($1,$2,$3)', [seatNum, userId, movieId], () => {
        console.log('values inserted.')
    })
})

app.get('/reservations/:username', (req, res) => {
    const username = req.params.username
    db.query('select users.first_name, movies.title,movies.image,reservations.seat_number,reservations.reservation_id from reservations inner join users on reservations.user_id = users.user_id inner join movies on reservations.movie_id = movies.movie_id where users.username = $1', [username], (err, result) => {
        res.send(result.rows)
    })
})

app.delete('/deleteReservation/:resId', (req, res) => {

    const resId = req.params.resId

    db.query('delete from reservations where reservation_id = $1', [resId], () => {
        console.log('reservation deleted.')
    })
})

app.get('/premiere', (req, res) => {
    db.query('select movies.title,movies.year,movies.description,movies.image,movies.duration,movies.premiere,movies.showing,movies.time_playing,genres.genre from movies inner join genres on movies.genre_id = genres.genre_id where premiere = true', (err, result) => {
        try {
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)
        }
    })
})

app.get('/allSeats', (req, res) => {
    db.query('select * from Seats ', (err, result) => {
        res.send(result.rows)
    })
})


app.get('/genres', (req, res) => {
    db.query('select * from genres', (err, result) => {
        res.send(result.rows)
    })
})

app.get('/rooms', (req, res) => {
    db.query('select * from rooms', (err, result) => {
        res.send(result.rows)
    })
})
app.get('/today', (req, res) => {

    db.query('select movies.title,movies.year,movies.description,movies.image,movies.duration,movies.premiere,movies.showing,movies.time_playing,rooms.room_number from movies inner join rooms on movies.room_id = rooms.room_id where showing = current_date', (err, result) => {
        res.json(result.rows)
    })
})

app.get('/adminReservations', (req, res) => {
    db.query('select users.first_name, users.last_name, movies.title,movies.image,reservations.seat_number,reservations.reservation_id from reservations inner join users on reservations.user_id = users.user_id inner join movies on reservations.movie_id = movies.movie_id', (err, result) => {
        res.send(result.rows)
    })
})

app.listen(5000, () => {
    console.log('listening on 5k port')
})