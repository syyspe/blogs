const listHelper = require('../utils/list_helper')
const {blogs, only} = require('./testdata/testblogs')

describe('smoke', () => {
    test('dummy is called', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })    
})

describe('total_likes', () => {
    test('total_likes with empty list returns 0', () => {
        expect(listHelper.total_likes([])).toBe(0)
    })

    test('total_likes with just one blog returns likes of that blog', () => {
        expect(listHelper.total_likes(only)).toEqual(only[0].likes)
    })

    test('total likes with a bunch of blogs', () => {
        expect(listHelper.total_likes(blogs)).toBe(36)
    })
})

describe('favouriteBlog', () => {
    test('favouriteBlog with empty list returns undefined', () => {
        expect(listHelper.favouriteBlog([])).toEqual(undefined)
    })

    test('favouriteBlog with just one blog returns that blog', () => {
        expect(listHelper.favouriteBlog(only)).toEqual(only[0])
    })

    test('favouriteBlog with many blogs returns correct number of likes', () => {
        expect(listHelper.favouriteBlog(blogs).likes).toBe(12)
    })
})

describe('mostBlogs', () => {
    test('mostBlogs with empty list returns undefined', () => {
        expect(listHelper.mostBlogs([])).toEqual(undefined)
    })

    test('mostBlogs with just one blog returns that author and 1', () => {
        const expected = {author: only[0].author, blogs: 1}
        expect(listHelper.mostBlogs(only)).toEqual(expected)
    })

    test('mostBlogs with many blogs returns correct author and blog count', () => {
        const expected = {author: 'Robert C. Martin', blogs: 3}
        expect(listHelper.mostBlogs(blogs)).toEqual(expected)    
    })
})

describe('mostLikes', () => {
    test('mostLikes with empty list returns undefined', () => {
        expect(listHelper.mostLikes([])).toEqual(undefined)
    })

    test('mostLikes with just one blog returns that author and likes', () => {
        const expected = {author: only[0].author, likes: 42}
        expect(listHelper.mostLikes(only)).toEqual(expected)
    })

    test('mostLikes with many blogs returns correct author and likes', () => {
        const expected = {author: 'Edsger W. Dijkstra', likes: 17}
        expect(listHelper.mostLikes(blogs)).toEqual(expected)
    })
})