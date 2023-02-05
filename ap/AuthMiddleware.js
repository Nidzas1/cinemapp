const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    
    const accessToken = req.header('accessToken')

    if (!accessToken) return res.json({ error: 'User Not logged in' })

    try {
        const validToken = jwt.verify(accessToken, 'secretkey')

        if (validToken) {
            return next()
        }
    }
    catch (err) {
        return res.json({ error: err })
    }
}

module.exports = { validateToken }