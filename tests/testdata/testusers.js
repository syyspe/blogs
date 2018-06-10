const users = [
    {
        name: 'authenticates',
        username: 'authen',
        password: '12345678',
        adult: true,
        blogs: []
    },
    {
        name: 'Test User I',
        username: 'test user 1',
        password: '12345678',
        adult: true,
        blogs: []
    },
    {
        name: 'Test User II',
        username: 'test user 2',
        password: 'äåö&/%#$',
        adult: true,
        blogs: []
    },
    {
        name: 'Test User III',
        username: 'test user 3',
        password: 'äåö&/%#$',
        adult: false,
        blogs: []
    },
    {
        name: 'Test User IV',
        username: 'test user 4',
        password: 'äåö&/%#$',
        adult: true,
        blogs: []
    },
    {
        name: 'Test User V',
        username: 'test user 5',
        password: 'äåö&/%#$',
        adult: false
    }
]

const userUndefinedName = {
    name: undefined,
    username: 'nemo',
    password: 'nautilus',
    adult: true,
    blogs: []
}

const userUndefinedUsername = {
    name: 'useless',
    username: undefined,
    password: 'notneeded',
    adult: true,
    blogs: []
}

const userUndefinedPassword = {
    name: 'careless',
    username: 'notneeded',
    password: undefined,
    adult: true,
    blogs: []
}

const userUndefinedAdult = {
    name: 'ageless',
    username: 'guessmyage',
    password: 'amI42?',
    adult: undefined,
    blogs: []
}

const userShortUsername = {
    name: 'lazy I',
    username: 'me',
    password: 'howlong',
    adult: false,
    blogs: []
}

const userShortPassword = {
    name: 'lazy II',
    username: 'ranoutofchars',
    password: '..',
    adult: true,
    blogs: []
}

const validUser = {
    name: 'Proper Geezer',
    username: 'pgeez',
    password: '123456789',
    adult: true,
    blogs: []
}

module.exports = {
    users,
    userUndefinedName,
    userUndefinedUsername,
    userUndefinedPassword,
    userUndefinedAdult,
    userShortUsername,
    userShortPassword,
    validUser
}