


module.exports = function (app) {

    var companies = require('../controllers/company.controller.js')

    app.get('/companies', companies.findAll);

    app.get('/companies/:id', companies.findById);

    app.post('/companies', companies.addCompany);

    app.put('/companies/:id', companies.updateById);

    app.delete('/companies/:id', companies.removeById);

}