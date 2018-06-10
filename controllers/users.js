const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    try {
        const result = await User
            .find({})
            .populate('blogs', {_id: 1, likes: 1, author: 1, title: 1, url: 1})
        const users = result.map(User.format)
        response.json(users)
    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        
        if(!body.username || body.username.length === 0) {
            return response
                .status(400)
                .json({error: 'username not specified'})
        }

        const exists = await User.find({username: body.username})
        if(exists.length > 0) {
            return response.status(400).json({error: `user ${body.username} already exists`})
        }

        if(!body.password || body.password.length < 3) {
            return response.status(400).json({error: 'password must be at least three characters long'})
        }

        const hash = await bcrypt.hash(body.password, 10)
        const newUser = new User({
            name: body.name,
            username: body.username,
            passwordHash: hash,
            adult: body.adult || true,
            blogs: []
        })

        const result = await newUser.save()
        response.status(201).json(result)

    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = usersRouter