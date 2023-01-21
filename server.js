require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 3500

mongoose.set('strictQuery', false)

// Connect to MongoDB
connectDB()

app.use(logger)

// Handle options credentials check - before CORS! 
// and fetch cookies credentials requirement
// app.use(credentials)

//app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data in other words, form data:
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// middleware for cookies  
app.use(cookieParser())

// serve static files
app.use('/', express.static(path.join(__dirname,'/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/refresh', require('./routes/refresh'))

//app.use(verifyJWT)
app.use('/posts', require('./routes/api/posts'))
app.use('/users', require('./routes/api/users'))

// Handling requests for routes that do not exist
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views','404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" })
    } else {
        res.type('txt').send("404 Not Found")
    }
})

// Custom handling of errors
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})