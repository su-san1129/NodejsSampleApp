var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection'); 

router.get('/', function(req, res, next) {
  res.render('top', { title: 'Express' });
});

module.exports = router;