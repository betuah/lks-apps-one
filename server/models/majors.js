const {db, Sequelize} = require('../config/database/sequelize')

const majorsModel = db.define('majors', {
    majorsId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    major_name: {
        type: Sequelize.STRING
    }
})

module.exports = majorsModel