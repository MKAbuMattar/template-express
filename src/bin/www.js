#!/user/bin/env node
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import http from 'http'
import app from '..'

import { PORT } from '../env/variable.env'
import logger from '../utils/logger.util'

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  logger.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
