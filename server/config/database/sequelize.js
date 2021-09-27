const Sequelize = require("sequelize")
const env       = require('../../env')

const db = new Sequelize(`${env.sequelize.database}`, `${env.sequelize.username}`, `${env.sequelize.password}`, {
    host: env.sequelize.host,
    dialect: env.db_type,
    logging: false,
});

const dbConn = db.authenticate().then(() => {
    return true
}).catch(err => {
    console.log(new Error(`Failed connect to database sequelize! \n${err}`))
    return false
})

module.exports = { db, dbConn, Sequelize }