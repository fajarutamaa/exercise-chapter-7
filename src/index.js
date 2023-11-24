const express = require('express')
const app = express()
const router = require('./routes/route')

require('dotenv').config()

const http = require('http').Server(app)
const io = require('socket.io')(http)

// const server = http.createServer(app)
// const io = socketIo(server)(http)


const port =  3000

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use('/api/v1/', router)

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

io.on('connection', (socket) => {
    console.log('User connected')
  
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
    // socket.on('disconnect', () => {
    //   console.log('User disconnected')
    // })
  })