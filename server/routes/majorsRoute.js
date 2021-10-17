const MajorsController  = require('../controllers/majosController')
const { filesUploadS3 } = require('../middlewares/uploadMiddleware')
const redisCache        = require('../middlewares/cacheMiddleware')

module.exports = (app) => {
    
    app.route('/majors')
        .get(redisCache, MajorsController.index)

}