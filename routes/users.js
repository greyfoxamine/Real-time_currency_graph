var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var lien ='http://apilayer.net/api/live'

    lien = lien+'?access_key=575f956947d9268fe8be6343bd32e875'
     lien = lien+'&currencies=USD,GBP,CAD,PLN,MAD'
     lien = lien+'&source=USD'
     lien = lien+'&format=1';
     console.log(lien);
	var http_resultat = request('GET', lien);
	console.log(JSON.parse(http_resultat.getBody('utf8')));
 	 res.send('respond with a resource');
});

module.exports = router;
