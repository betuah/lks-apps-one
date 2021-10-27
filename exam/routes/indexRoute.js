const indexController  = require('../controllers/indexController')

module.exports = (app) => {
    
    app.route('/exam')
        .get(indexController.index)

    app.route('/exam/quiz')
        .get(indexController.getAllData)

    app.route('/exam/init')
        .get(indexController.create)
    
    app.route('/exam/flush')
        .get(indexController.flush)

}