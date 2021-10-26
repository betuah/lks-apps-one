const indexController  = require('../controllers/indexController')

module.exports = (app) => {
    
    app.route('/')
        .get(indexController.index)

    app.route('/exam')
        .get(indexController.getAllData)

    app.route('/exam/init')
        .get(indexController.create)
    
    app.route('/exam/flush')
        .get(indexController.flush)
}