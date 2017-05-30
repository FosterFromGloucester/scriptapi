var http = require('http');
var express = require('express');
var gpio = require('pi-gpio');
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

app.get('/weather/',function(req,res){
	
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
