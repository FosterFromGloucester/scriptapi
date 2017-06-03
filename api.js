var http = require('http');
var express = require('express');
var gpio = require('pi-gpio');
var requests = require('request');

var app = express();

app.use(express['static'](__dirname));

app.get('/input_state/:pin',function(req,res){	

	console.log('Getting GPIO pin state for:'+req.params.pin);
	gpio.open(req.params.pin,"input",function(err){
		if(err){
			throw err;
		}
	});
	console.log('Opened pin '+req.params.pin);
	gpio.read(req.params.pin,function(err,value){
		if(err){
			throw err;
		}
		pi_inputs = [{pin:req.params.pin,pin_value:value}];
		res.status(200).send(pi_inputs);
	});

	gpio.close(req.params.pin);
});

app.get('/weather/:lat/:long',function(req,res){
	var lat,long,base_url,token;
	lat = req.params['lat'];
	long = req.params['long'];
	token = "3d893975dbfa53a17b2b197dd6c03780"
	base_url = String.format("https://api.darksky.net/forecast/{0}/{1},{2}",token,lat,long);
	console.log("Querying "+base_url);
	requests(base_url,function(error,response,body){
		if(response.statusCode == 200){
			res.status(200).send(response);
		}
		else{
			res.status(500).send(error);
		}
	});
});

app.get('*',function(req,res){
	res.status(404).send('API endpoint not found');
});

app.use(function(err,req,res,next){
	if(req.xhr){
		res.status(500).send('Error');
	}else{
		next(err);
	}
});

app.listen(3000);
