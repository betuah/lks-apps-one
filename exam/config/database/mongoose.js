const mongoose  = require('mongoose')
const fs        = require('fs')
const path      = require('path')
const env       = require('../../env')

const clusterUrl = `mongodb://${env.mongoose.username}:${env.mongoose.password}@${env.mongoose.host}:${env.mongoose.port || '27017'}/${env.mongoose.database}?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
const ca = `${path.join(__dirname, `../../ssl/${ env.mongoose.cert || 'rds-combined-ca-bundle.pem'}`)}`

let mongoConn

if (env.db_type === 'mongodb_aws') {
    mongoConn = mongoose.connect(`${clusterUrl}`, {
        tlsCAFile: `${ca}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        return true
    }).catch((e) => {
        console.log(e)
        return false
    })
} else {
    mongoConn = mongoose.connect(`mongodb://${env.mongoose.host}:${env.mongoose.port}/${env.mongoose.database}`, {
        auth: { "authSource": "admin" },
        user: env.mongoose.username,
        pass: env.mongoose.password,
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    }).then(() => {
        return true
    }).catch((e) => {
        console.log(e)
        return false
    })
}

module.exports = mongoConn