const indexController  = require('../controllers/indexController')

module.exports = (app) => {
    
    app.route('/')
        .get(indexController.index)

    app.route('/exam')
        .get(indexController.getAllData)

    app.route('/init')
        .get(indexController.create)
    
    app.route('/flush')
        .get(indexController.flush)
}