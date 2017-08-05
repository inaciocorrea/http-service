var express = require('express')
var app = express();
var _ = require('underscore')

app.enable('trust proxy');

app.get('/', function(req, res){
  res.send('Hello World');
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

/* istanbul ignore next */
if (!module.parent) {
  app.listen(80);
  console.log('HTTP Server started');
}