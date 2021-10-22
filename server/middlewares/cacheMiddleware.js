const fs            = require('fs')
const path          = require('path')
const redisClient   = require('../config/redis_config')
const flatCachelib  = require('flat-cache')
const env           = require('../env')

let redisCache = (req, res, next) => {
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

let flatCache = (req,res, next) => {
    const cache_path = env.cache_path || path.join(__dirname, '../tmp')

    if (!fs.existsSync(cache_path)) {
        fs.mkdirSync(cache_path, { recursive: true })
    }

    const fCache = flatCachelib.load("__API_ENDPOINT__" + req.originalUrl || req.url, path.resolve(`${cache_path}`))
    const dateTime = new Date().getTime()

    let keyId =  '__express__' + req.originalUrl || req.url
    let keyData = {
        expire: this.expire === false ? false : dateTime + this.expire,
        data: keyId
    }

    let cacheContent = fCache.getKey(keyData)

    if ( cacheContent){
        res.json(JSON.parse(cacheContent))
        return
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            fCache.setKey(keyData, body);
            fCache.save();
            res.sendResponse(body)
        }
        next()
    }
};

module.exports = { redisCache, flatCache };