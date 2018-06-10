const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

mongoose
    .connect(config.mongoUri)
    .then(() => {
        console.log('connected to database')
    })
    .catch(error => {
        console.log(`could not connect to database: ${error.message}`)
    })

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(middleware.logger)
app.use(middleware.getToken)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.error)

const server = http.createServer(app)

server.on('close', () => {
    mongoose.connection.close()
})

server.listen(config.port, () => {
    console.log(`server running on port ${config.port}`)
})

module.exports = {
    app,
    server
}
