var express = require('express'),
	app = express(),
	_ = require('underscore'),
	bodyParser = require('body-parser');

app.enable('trust proxy');
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('I\'m here !');
});

app.get('/status/:code', function(req, res) {
	// console.log(req.params);
	res.statusCode = req.params.code;
	res.send('');
});

app.get('/ip', function(req, res) {
	res.send({'ip': req.ip});
});

app.get('/user-agent', function(req, res) {
	res.send({'user-agent': req.get('user-agent')})
});

app.get('/headers', function(req, res) {
	res.send({'headers': req.headers})
});

app.get('/get', function(req, res) {
	res.send({'args': req.query})
});

app.post('/post', function(req, res) {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	});
	console.log(req.body);
	res.send(req.body);
});


app.get('/cookies', function(req, res) {
	res.send(req.cookies)
});

app.get('/cookies/set', function(req, res) {
	// console.log(req.query);
	_.each(req.query, function(name, value) {
		res.cookie(name, value);
	});
	console.log(req.get('cookies'));
	res.send(req.cookies)
});

app.get('/eicar', function(req, res) {
	res.send('X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(80);
  console.log('HTTP Server started');
}

module.exports = app;