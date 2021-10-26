const indexController  = require('../controllers/indexController')

module.exports = (app) => {
    
    app.route('/')
        .get(indexController.index)

    app.route('/quiz')
        .get(indexController.getAllData)

    app.route('/init')
        .get(indexController.create)
    
    app.route('/flush')
        .get(indexController.flush)

}