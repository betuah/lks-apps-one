const redis = require("redis")
const env   = require('../../env')
const fs    = require("fs")

const config = {
    port      : env.redis.port,             
    host      : `${env.redis.host}`,        
    password  : `${env.redis.password}`,    
}

const ssl = {
    tls       : {
        key  : fs.readFileSync(`${env.httpsPrivateKey}`, 'utf8'),  
        cert : fs.readFileSync(`${env.httpsCertificate}`, 'utf8')
    }
}

const redisClient = redis.createClient(env.node_env === 'production' ? {...config,...ssl} : config)

module.exports = redisClient