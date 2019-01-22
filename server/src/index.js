import './utils'
import express from 'express'
import morgan from 'morgan'
import { getRandomSentence } from './api/sentences'

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = parseInt(process.env.PORT, 10) || 4000

io.set('origins', '*:*')
app.use(require('cors')({ origin: process.env.CLIENT_ORIGIN }))
app.use(require('helmet')())
__DEV__ ? app.use(morgan('dev')) : app.use(morgan('common'))

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

export default app
