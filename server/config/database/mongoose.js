const mongoose  = require('mongoose');
const env       = require('../env');
const conn      = mongoose.connection;

const mongoConn = mongoose.connect(`mongodb://${env.mongoose.host}:${env.mongoose.port}/${env.mongoose.database}`, {
    auth: { "authSource": "admin" },
    user: env.mongoose.username,
    pass: env.mongoose.password,
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true
}).then(() => {
    return true
}).catch((e) => {
    console.log(e)
    return false
})

module.exports = mongoConn;