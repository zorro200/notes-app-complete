// Enables process.env
require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const logger = require('./middleware/loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Middlewares - The middlewares' order is always important
app.use(cors()) // public
// Parses the object that the request has received (req.body) to JSON
app.use(express.json())
app.use('/images', express.static('images'))
app.use(logger)

app.use(express.static('../app/build'))

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../app/build', 'index.html'))
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Errors handler middlewares (always after the others main paths)
// Will be executed if none rute equals to the requested
app.use(notFound)
app.use(handleErrors)

// DEPLOYMENT PORT or BY DEFAULT
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
