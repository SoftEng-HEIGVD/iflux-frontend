var
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    config = require('../../config/config');

module.exports = function (app) {
    app.use('/', router);
};

router.route('/partials/:page')
    .get(function (req, res, next) {
        res.render('partials/' + req.url.replace('/partials/', ''));
      //  res.sendFile(path.join(__dirname, '../views/partials', req.params.page));

    });

router.route('/*')
    .get(function (req, res, next) {
        res.render('layout', {apiUrl: config.app.apiUrl, partialsPath: '/partials'});
    });


