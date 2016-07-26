var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
