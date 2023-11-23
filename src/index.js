const express = require('express')
const app = express()
const router = require('./routes/route')
const http = require('http').Server(app)
const io = require('socket.io')(http)

require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1/', router)

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})