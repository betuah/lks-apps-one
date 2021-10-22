const MajorsController  = require('../controllers/majosController')
const { flatCache }     = require('../middlewares/cacheMiddleware')

module.exports = (app) => {
    
    app.route('/majors')
        .get(flatCache, MajorsController.index)

}