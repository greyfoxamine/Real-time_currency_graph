var express = require('express');
var router = express.Router();
var request = require('sync-request');
//var request = require('request');
var fs = require('fs');
var waterfall = require('async-waterfall');


function formatting_date(today)
{
	 var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
	} 

	if(mm<10) {
   		 mm='0'+mm
	} 

	today_format = yyyy+'-'+mm+'-'+dd;
	return today_format;

}

/* GET users listing. */
router.get('/', function(req, res) {
waterfall([
	function initialise_data(callback){
			 var output="$(function() {\n";
  		output=output+"Morris.Area({\n";
        output=output+"element: 'morris-area-chart',\n";
        output=output+"xkey: 'period',\n";
       output=output+"ykeys: ['USDAUD','USDGBP','USDCAD','USDEUR','USDMAD'],\n";
       output=output+"labels: ['Dollard Australie($AU)', 'Livre sterling(£)', 'Dollard Canada($CA)','EURO ()','Dirham Marocain(DH)'],\n";
        output=output+"pointSize: 2,\n";
        output=output+"hideHover: 'auto',\n";
        output=output+"resize: true,\n";
        output=output+"data:[\n";
        callback(null,output);

	},
	function getdata(output,callback){
		for(var i=0;i<=12;i++)
    {

    	  var d = new Date();
    	
 		d.setMonth(d.getMonth() - i);

		 var lien= 'http://apilayer.net/api/historical'
     	lien = lien +'?access_key=5662ed9271715ddeb17964fd0a22cbaa';
      	lien = lien+'&format=1';
    	 lien = lien + '&date='+formatting_date(d)+'';
     	lien = lien+'&currencies=AUD,GBP,CAD,EUR,MAD';
    	console.log(i);
    
		var res = request('GET', lien);
		
		data=JSON.parse(res.getBody('utf8'));
		console.log(data)
		if (!data.success) {
			callback(data.error.info)
			return;
		}
		else
		{
			data.quotes['period']=data.date;
  			console.log(data.quotes);
    		output=output+JSON.stringify(data.quotes)+"";
    		if(i==12){
    			output= output+"]});});";
    			

   			 }
   			 else
   			 {
   			 	output=output+',\n';
   			 	
   			 }

		}
	
    }
    callback(null,output);

	}



	],function(err,result){
		if (err) {
			console.error(err);
			res.render("error.ejs" ,{data:data});
		}
		else{
			fs.writeFile('public/data/morris-data.js', result, (err) => {
  			if (err) throw err;
  				res.render("index.ejs");			
  			});
			
		}
		

	});

});




router.get('/:annee', function(req, res, next) {

		var re = /(?:(?:19|20)[0-9]{2})/;
		var trouvé = req.params.annee.match(re);

		if(!trouvé)
		{
			var data = '{ "error" : ' +
'{ "code":"633" , "type":"paramétre invalide" , "info":"l\'annéedoit etre entre 1900 & 2099 " }}';
	
    	res.render("error.ejs" ,{data : JSON.parse(data)});
    	
		}
		else{
	waterfall([
	function initialise_data(callback){
			 var output="$(function() {\n";
  		output=output+"Morris.Area({\n";
        output=output+"element: 'morris-area-chart',\n";
        output=output+"xkey: 'period',\n";
       output=output+"ykeys: ['USDAUD','USDGBP','USDCAD','USDEUR','USDMAD'],\n";
       output=output+"labels: ['Dollard Australie($AU)', 'Livre sterling(£)', 'Dollard Canada($CA)','EURO ()','Dirham Marocain(DH)'],\n";
        output=output+"pointSize: 2,\n";
        output=output+"hideHover: 'auto',\n";
        output=output+"resize: true,\n";
        output=output+"data:[\n";
        callback(null,output);

	},
	function getdata(output,callback){
		for(var i=0;i<=12;i++)
    {

    	  var d = new Date();

    	d.setFullYear(req.params.annee);
 		d.setMonth(d.getMonth() - i);

		 var lien= 'http://apilayer.net/api/historical'
     	lien = lien +'?access_key=5662ed9271715ddeb17964fd0a22cbaa';
      	lien = lien+'&format=1';
    	 lien = lien + '&date='+formatting_date(d)+'';
     	lien = lien+'&currencies=AUD,GBP,CAD,EUR,MAD';
    	console.log(i);
    
		var res = request('GET', lien);
		
		data=JSON.parse(res.getBody('utf8'));
		console.log(data)
		if (!data.success) {
			callback(data.error.info)
			return;
		}
		else
		{
			data.quotes['period']=data.date;
  			console.log(data.quotes);
    		output=output+JSON.stringify(data.quotes)+"";
    		if(i==12){
    			output= output+"]});});";
    			

   			 }
   			 else
   			 {
   			 	output=output+',\n';
   			 	
   			 }

		}
	
    }
    callback(null,output);

	}



	],function(err,result){
		if (err) {
			console.error(err);
			res.render("error.ejs" ,{data:data});
		}
		else{
			fs.writeFile('public/data/morris-data.js', result, (err) => {
  			if (err) throw err;
  				res.render("index.ejs");			
  			});
		}
		

	});
	} 
});

module.exports = router;
