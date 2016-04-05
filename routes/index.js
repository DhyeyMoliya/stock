var express = require('express');
var router = express.Router();
var path = require('path');

/* GET login page. */
router.get('/', function (req, res, next) {
    res.sendfile(path.join(__dirname + '/../public/login.html'));
});

router.get('/stock', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/dashboard.html'))
});

module.exports = router;
