var express = require('express');
var router = express.Router();
var request = require('sync-request');
//var request = require('request');
var fs = require('fs');
var waterfall = require('async-waterfall');

/* GET home page. */
router.get('/', function(req, res, next) {

var res = request('GET', 'https://sandbox.tradier.com/v1/markets/quotes?symbols=spy', {
  'headers': {
    'Accept': 'application/json',
    'Authorization': 'Bearer zseSC0QasNjZatHDAc9m0fQDYH0I'

  }
});
  console.log(JSON.parse(res.getBody()));
  res.send('ords');
});

router.get('/create', function(req, res, next) {
 
});

router.get('/modify', function(req, res, next) {
  res.render('ordre_history.ejs');
});

router.get('/delete', function(req, res, next) {
  res.render('ordre_history.ejs');
});

module.exports = router;
