const indexController  = require('../controllers/indexController')

module.exports = (app) => {
    
    app.route('/check')
        .get(indexController.index)

}