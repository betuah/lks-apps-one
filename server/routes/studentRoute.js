const Student           = require('../controllers/studentController')
const { filesUploadS3 } = require('../middlewares/uploadMiddleware')

module.exports = (app) => {
    
    app.route('/students')
        .get(Student.index)

    app.route('/students')
        .post(filesUploadS3, Student.create)

}