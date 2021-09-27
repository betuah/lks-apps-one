const {db, Sequelize} = require('../config/database/sequelize');

const DepartmentsModel = db.define('Users', {
    deparmentId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER,
        validate: {
            isNumeric: true
        }
    },
    gender: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    profile_pics: {
        type: Sequelize.STRING
    },
    document: {
        type: Sequelize.STRING
    },
    majors: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true
        }
    }
});

module.exports = DepartmentsModel;