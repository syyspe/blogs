const logger = (request, response, next) => {
    if(process.env.NODE_ENV === 'test') {
        return next()
    }
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

const getToken = (request, response, next) => {
    try {
        const auth = request.get('Authorization')
        if (auth && auth.toLowerCase().startsWith('bearer ') && auth.length > 10) {
            const token = auth.split(' ')[1]
            request.token = token
        } else {
            request.token = null
        }
    } catch(error) {
        request.token = null
    }
    next()
}

const error = (request, response) => {
    response.status(404).json({error: 'not found'})
}

module.exports = {
    logger,
    error,
    getToken
}
