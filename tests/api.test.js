const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const blogData = require('./testdata/testblogs')
//const Blog = require('../models/blog')
const User = require('../models/user')
const utils = require('./test_utils')
const userData = require('./testdata/testusers') 

let tester = null
let token = null
const login = async () => {
    tester = utils.testUser(userData.users)
    await User.findOneAndRemove({username: tester.username})
    await api
        .post('/api/users')
        .send(tester)

    const result = await api
        .post('/api/login')
        .send({
            username: tester.username, 
            password: tester.password
        })
           
    token = result.body.token
}

beforeAll(async () => {
    await login()
})

describe('0. login', async () => {
    test('user ok', async () => {
        const fromDB = await User.findOne({username: tester.username})
        expect(fromDB.name).toBe(tester.name)
    })
})

describe('blog tests 1. basics', async () => {
    beforeAll(async () => {
        await utils.initBlogs()
        await utils.addBlogs(blogData.blogs)
    })
    
    test('api returns blogs as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        const count = await utils.blogCount()
        expect(response.body.length).toBe(count)
    })
    
    test('a specific blog is amongst returned blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
        const authors = response.body.map(blog => blog.author)
        const author = utils.randomAuthor(blogData.blogs)
        expect(authors).toContain(author)
    })
})

describe('blog tests 2. adding blogs', async () => {
    beforeAll(async () => {
        await utils.initBlogs()
    })

    test('adding a blog', async () => {
        const blog = utils.randomBlog(blogData.blogs)
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-type', /application\/json/)
    
        const all = await utils.blogsInDB()
        const titles = all.map(blog => blog.title)
        expect(titles).toContain(blog.title)
    })
    
    test('adding a blog with undefined likes sets likes to zero', async () => {
        const blogsBefore = await utils.blogCount()
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogData.undefinedLikes)
            .expect(200)
            .expect('Content-type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const theOne = response.body.find(blog => blog.title === blogData.undefinedLikes.title)
        expect(theOne.likes).toBe(0)
        expect(response.body.length).toBe(blogsBefore + 1)
    }) 
    
    test('adding a blog without title responds 400', async () => {
        const blogsBefore = await utils.blogCount()
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(blogData.undefinedTitle)
            .expect(400)
            .expect('Content-type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const theOne = response.body.find(blog => blog.author === blogData.undefinedTitle.author)
        expect(theOne).toBe(undefined)
        expect(response.body.length).toBe(blogsBefore)
    })
    
    test('adding a blog without url responds 400', async () => {
        const blogsBefore = await utils.blogCount()
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogData.undefinedUrl)
            .expect(400)
            .expect('Content-type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const theOne = response.body.find(blog => blog.author === blogData.undefinedUrl.author)
        expect(theOne).toBe(undefined)
        expect(response.body.length).toBe(blogsBefore)
    }) 

    /*
    * This doesn't work as a test, it returns always 400 bad request.
    * I assume the request is intercepted by something internal
    * to supertest. Similar malformed token works ok (401) with RESTClient
    * so leaving this out for now.  
    *
    test('adding a blog with malformed token', async () => {
        const blogsBefore = await utils.blogCount()
        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${blogData.invalidToken}`)
            .expect(500)

    }) */ 
})

describe('blog tests 3. deleting blogs', async () => {
    beforeAll(async () => {
        await utils.initBlogs()
    })
    
    /* malformed tokens dn't seem to work as tests (see comment in 2. above)
    *  so no invalid user test here. Tested same with RESTClient, OK.
    */
    test('deleting a blog', async () => {
        const blogsBefore = await utils.blogCount()
        const blog = await utils.randomBlog(blogData.blogs)
        const result = await api
            .post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(200)
        
        await api
            .delete(`/api/blogs/${result.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        const blogsAfter = await utils.blogCount()
        expect(blogsAfter).toBe(blogsBefore)
    })
})

describe('blog tests 4. modifying blogs', async () => {
    beforeAll(async () => {
        await utils.initBlogs()
    })

    test('updating likes of one random blog', async () => {
        const blog = utils.randomBlog(blogData.blogs)
        const likesBefore = blog.likes
        const added = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(200)
        const updated = added.body
        updated.likes += 1
        await api
            .put('/api/blogs')
            .send(updated)
            .expect(200)
        
        const after = await utils.blogById(updated._id)
        expect(after.likes).toBe(likesBefore + 1)
    })
})

describe('user tests 1. basics', async () => {
    beforeAll(async () => {
        await utils.initUsers()
        await utils.addUsers(userData.users)
    })

    test('all users are returned', async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-type', /application\/json/)

        expect(result.body.length).toBe(userData.users.length)
    })

    test('user is created', async () => {
        const result = await api
            .post('/api/users')
            .send(userData.validUser)
            .expect(201)
            .expect('Content-type', /application\/json/)
        expect(result.body.username).toEqual(userData.validUser.username)
        const verifyUser = await User.find({username: userData.validUser.username})
        expect(verifyUser[0].username).toBe(userData.validUser.username) 
    })

    test('existing username is rejected', async () => {
        const dublicateUser = utils.randomUser(userData.users)
        const usersBefore = await utils.userCount()
        const result = await api
            .post('/api/users')
            .send(dublicateUser)
            .expect(400)
            .expect('Content-type', /application\/json/)
        const usersAfter = await utils.userCount()
        expect(usersAfter).toBe(usersBefore)
        expect(result.body.error).toContain('already exists')
    })
})

describe('user tests 2. invalid or missing data', async () => {
    beforeAll(async () => {
        await User.remove({})
    })
    
    test('undefined username', async () => {
        const countBefore = await utils.userCount()
        const result = await api
            .post('/api/users')
            .send(userData.userUndefinedUsername)
            .expect(400)
            .expect('Content-type', /application\/json/)
        expect(result.body.error).toContain('username not specified')
        const countAfter = await utils.userCount()
        expect(countBefore).toBe(countAfter)
    })

    test('undefined password', async () => {
        const countBefore = await utils.userCount()
        const result = await api
            .post('/api/users')
            .send(userData.userUndefinedPassword)
            .expect(400)
            .expect('Content-type', /application\/json/)
        expect(result.body.error).toContain('password must be at least')
        const countAfter = await utils.userCount()
        expect(countBefore).toBe(countAfter)
    })

    test('too short password', async () => {
        const countBefore = await utils.userCount()
        const result = await api
            .post('/api/users')
            .send(userData.userShortPassword)
            .expect(400)
            .expect('Content-type', /application\/json/)
        expect(result.body.error).toContain('password must be at least')
        const countAfter = await utils.userCount()
        expect(countBefore).toBe(countAfter)
    })
    
    test('undefined adultness', async () => {
        const countBefore = await utils.userCount()
        const result = await api
            .post('/api/users')
            .send(userData.userUndefinedAdult)
            .expect(201)
            .expect('Content-type', /application\/json/)
        const countAfter = await utils.userCount()
        expect(countAfter).toBe(countBefore + 1)
        const verifyUser = await User.findById(result.body._id)
        expect(verifyUser.username).toBe(userData.userUndefinedAdult.username)
    })
}) 

afterAll( async () => {
    // Leave some stuff to DB
    //await utils.populateDB(blogData.blogs, userData.users)
    server.close()
})