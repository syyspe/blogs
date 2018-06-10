const jsonToken = require('jsonwebtoken') 
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

loginRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if(body.username.length === 0 || body.password.length === 0) {
            return response
                .status(401)
                .json({error: 'username/password missing'})
        }

        const user = await User.findOne({username: body.username})

        const authOK = user === null 
            ? false 
            : await bcrypt.compare(body.password, user.passwordHash)

        if(!user || !authOK) {
            return response
                .status(401)
                .json({error: 'invalid username or password'})
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = jsonToken.sign(userForToken, process.env.SECRET)

        response
            .status(201)
            .json({
                token: token, 
                username: user.username, 
                name: user.name
            })
    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = loginRouter