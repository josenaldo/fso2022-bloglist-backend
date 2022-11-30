const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', (request) => JSON.stringify(request.body))

const morganTemplate = `---
METHOD: :method
PATH: :url
STATUS: :status
RES TIME: :response-time ms
RES LENGTH: :res[content-length]
BODY: :body
---`
const requestLogger = morgan(morganTemplate)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('🔴', error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
    return
  }

  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
    return
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
