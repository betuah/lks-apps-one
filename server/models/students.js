const { db, Sequelize } = require('../config/database/sequelize')
const majors = require('./majors')

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
    majorsId: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

StudentsModel.belongsTo(majors, {foreignKey: 'majorsId'})

module.exports = StudentsModel