var express = require('express');
var router = express.Router();
var request = require('sync-request');
var request2 = require('request');
var fs = require('fs');
var waterfall = require('async-waterfall');

/* GET home page. */
router.get('/', function(req, res, next) {

var reponse = request('GET', 'https://api-2445581154346.apicast.io/positions?user_key=4f6158ef97874d8d49ead880fc6fe756');
try {
   reponse.getBody(('utf8')); // génère une exception
}
catch (e) {
	var data=new Object();
	data.error=new Object();
	data.error.code=e.statusCode;
	data.error.info=e.body.toString();
	data.error.type=e.body.toString();
	

	res.render("error.ejs" ,{data:data});

	
}
 
  var order=JSON.parse(reponse.getBody('utf8'));
  console.log(order);
 

  res.render('ordre_history.ejs',{order:order});
});




router.get('/create', function(req, res, next) {


	res.render('orders_create.ejs');
 
});

router.post('/create', function(req, res) {
	  var data=new Object();
	  data.error=new Object();
   console.log(req.body.qty);
   request2.post({url:"https://api-2445581154346.apicast.io/positions", 
   	form: {user_key:'4f6158ef97874d8d49ead880fc6fe756','Symbol':'EUR/USD','OrderQty':req.body.qty,'Side':req.body.side }}, 
   	function(err,httpResponse,body){ 
   if (!err && httpResponse.statusCode == 200) {
    
  
	
	data.error.code=httpResponse.statusCode;
	data.error.info=body;
	data.error.type="Votre ordre a été effectuer !! détail de l'ordre si dessous";
	
res.render("error.ejs" ,{data:data});
    
	
  }
  else
  {
  	
	data.error.code=httpResponse.statusCode;
	data.error.info=body;
	data.error.type=body;
	

	res.render("error.ejs" ,{data:data});
    
  	
   }
   		

    });

 

});

router.get('/modify', function(req, res, next) {
  res.render('not_supported.ejs');
});

router.get('/delete', function(req, res, next) {
  res.render('not_supported.ejs');
});

module.exports = router;
