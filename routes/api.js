var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
    var url = 'https://api.foursquare.com/v2/venues/search/';
    var filter = {};
    var options = {
        url: url,
        qs: {
            ll: req.query.latitude + ',' + req.query.longitude,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            query : req.query.query,
            v: moment().format('YYYYMMDD')
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            res.status(200).json(result.response);
        } else {
            if (error === null) {
                res.status(200).json(JSON.parse(body));
            } else {
                res.status(500).send(error);
            }
        }
    });
});

module.exports = router;
