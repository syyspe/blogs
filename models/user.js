const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    username: String,
    passwordHash: String,
    adult: Boolean,
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
    return {
        name: user.name,
        username: user.username,
        adult: user.adult,
        _id: user._id,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User