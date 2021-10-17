const redisClient   = require('../config/redis_config')

let cacheMiddleware = (req, res, next) => {
    let key = "__API_ENDPOINT__" + req.originalUrl || req.url
    redisClient.get(key, (err, reply) => {
        if (reply) {
            res.json(JSON.parse(reply))
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                redisClient.set(key, body, 'EX', 60)
                res.sendResponse(body)
            }
            next()
        }
    })
}

module.exports = cacheMiddleware;