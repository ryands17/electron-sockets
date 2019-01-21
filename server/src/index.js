require('dotenv').config()
const express = require('express')
const app = express()
const { getRandomSentence } = require('./api/sentences')

const PORT = parseInt(process.env.PORT, 10) || 4000

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.set('origins', '*:*')
app.use(require('cors')({ origin: process.env.CLIENT_ORIGIN }))
app.use(require('helmet')())

server.listen(PORT, () =>
  console.log(`App running on port http://localhost:${PORT}`)
)

app.get('/', (_, res) => {
  res.send('App live!')
})

//socket connection
let interval

io.on('connection', socket => {
  console.log('New client connected')
  /* sentence api */
  interval && clearInterval(interval)
  interval = setInterval(() => getRandomSentence(socket), 4000)
  /* sentence api */

  socket.on('disconnect', () => {
    interval && clearInterval(interval)
    console.log('Client disconnected')
  })
})

module.exports = app
