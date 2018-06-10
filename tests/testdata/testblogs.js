const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
]

const only = [{
    title: 'only one',
    author: 'someone',
    url: 'http://google.com',
    likes: 42,
}]

const undefinedLikes = {
    title: 'no likes',
    author: 'unpopular',
    url: 'http://google.com',
    likes: undefined
}

const undefinedTitle = {
    title: undefined,
    author: 'forgetful',
    url: 'http://google.com',
    likes: 3
}

const undefinedUrl = {
    title: 'no url',
    author: 'secretive',
    url: undefined,
    likes: 0
}

const invalidToken = 'xxxhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBla2thNCIsImlkIjoiNWIxYzE0ZjU1ZDVjODQyODJjZTE3ZDc4IiwiaWF0IjoxNTI4NjM4MDA0fQ.S48Qog-Fnv_GLM-qboaB1y_T9sKl2MQYoiBBN0Ys4ZY'

module.exports = {
    blogs,
    only,
    undefinedLikes,
    undefinedTitle,
    undefinedUrl,
    invalidToken
}