const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = () => {
    return {
        name: 'tester',
        username: 'tester', 
        password: 'tester',
        adult: true,
        blogs: []
    }
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs
}

const usersInDB = async () => {
    const users = await User.find({})
    return users
}

const blogCount = async () => {
    const blogs = await blogsInDB()
    return blogs.length
}

const userCount = async () => {
    const users = await usersInDB()
    return users.length
}

const randomAuthor = (blogs) => {
    const blog = randomBlog(blogs)
    return blog.author
}

const randomBlog = (blogs) => {
    const index = Math.floor(Math.random() * blogs.length)
    return blogs[index]
}

const blogById = async (id) => {
    const blog = await Blog.findOne({_id: id})
    return blog
}

const initBlogs = async () => {
    await Blog.remove({})
}

const addBlogs = async (blogs) => {
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}

const addUsers = async (users) => {
    const userObjects = users.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
}

const initUsers = async () => {
    await User.remove({})
}

const randomUser = (users) => {
    const index = Math.floor(Math.random() * users.length)
    return users[index]
}

module.exports = {
    addBlogs,
    addUsers,
    blogsInDB, 
    blogCount, 
    randomAuthor, 
    initBlogs, 
    randomBlog,
    blogById,
    initUsers,
    usersInDB,
    userCount,
    randomUser,
    testUser
}