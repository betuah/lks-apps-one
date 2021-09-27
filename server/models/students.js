const { db, Sequelize } = require('../config/database/sequelize')

const StudentsModel = db.define('students', {
    studentId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: Sequelize.STRING
    },
    tglLahir: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    profilePics: {
        type: Sequelize.STRING
    },
    document: {
        type: Sequelize.STRING
    },
    majors: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = StudentsModel