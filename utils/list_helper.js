const dummy = (blogs) => {
    if(blogs && blogs.length === 0) {
        return 1
    }
    return 1
}

const total_likes = (blogs) => {
    if(!blogs) {
        return 0
    }

    return blogs.reduce(function(sum, curr) {
        return sum + curr.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return undefined
    }

    let favourite = {}
    let maxLikes = 0
    for(var i = 0; i < blogs.length; i++) {
        if(blogs[i].likes > maxLikes) {
            favourite = blogs[i]
            maxLikes = blogs[i].likes
        }
    }

    return favourite
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return undefined
    }
    const map = new Map()
    let maxAuthor = undefined
    let maxBlogs = 0
    for(let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author 
        const count = (map.get(author) || 0) + 1
        map.set(author, count)
        if(count > maxBlogs) {
            maxBlogs = count
            maxAuthor = author
        }
    }

    return maxAuthor ? {author: maxAuthor, blogs: maxBlogs} : undefined
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return undefined
    }
    const map = new Map()
    let maxAuthor = undefined
    let maxLikes = 0
    for(let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        const count = (map.get(author) || 0) + blogs[i].likes
        map.set(author, count)
        if(count > maxLikes) {
            maxLikes = count
            maxAuthor = author
        }
    }

    return maxAuthor ? {author: maxAuthor, likes: maxLikes} : undefined
}

module.exports = {
    dummy,
    total_likes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}