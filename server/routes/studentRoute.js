const Student           = require('../controllers/studentController')
const { filesUploadS3 } = require('../middlewares/uploadMiddleware')
const { redisCache }    = require('../middlewares/cacheMiddleware')

module.exports = (app) => {
    
    app.route('/students')
        .get(redisCache, Student.index)

    app.route('/students/:studentId')
        .get(Student.details)

    app.route('/students')
        .post(filesUploadS3, Student.create)

}