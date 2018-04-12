var express = require('express'),
	app = express(),
	_ = require('underscore'),
	path = require('path'),
	compression = require('compression'),
	bodyParser = require('body-parser');

app.use(compression());
	
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(bodyParser.json());

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
	res.render('index');
//   res.send('I\'m here !');
});

app.get('/ip', function(req, res) {
	res.send({'ip': req.ip});
});

app.get('/uuid', (req, res) => {
	const uuid = require('uuid/v4');
	// console.log(uuid());
	res.send({'uuid': uuid()});
});

app.get('/user-agent', function(req, res) {
	res.send(req.header('user-agent'));
});

app.get('/get', function(req, res) {
	res.send({
		'args': req.query,
		'headers': req.headers,
		'origin': req.ip,
		'url': "http://" + req.headers.host + req.url
	});
});

app.post('/post', function(req, res) {
	res.send({
		'args': req.query,
		'form': req.body,
		'headers': req.headers,
		'origin': req.origin,
		'url': req.url
	});
});

app.get("/base64/:base64", (req, res) => {
	res.send(Buffer.from(req.params.base64, 'base64').toString());
});

app.get('/headers', function(req, res) {
	res.send({'headers': req.headers})
});

app.get('/status/:code', function(req, res) {
	// console.log(req.params);
	res.statusCode = req.params.code;
	res.send('');
});

app.get('/user-agent', function(req, res) {
	res.send({'user-agent': req.get('user-agent')})
});


app.get('/gzip', function(req, res) {
	res.send(req.headers);
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

app.get('/basic-auth/:user/:password', function(req, res) {

	var auth = req.headers['authorization'];

	if (!auth) {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="Type your credential"');
		res.send();
	} else {

		var tmp = auth.split(' ');

		var buffer = new Buffer(tmp[1], 'base64');
		var plain = buffer.toString();

		var credential = plain.split(':');

		if (credential[0] == req.params.user && credential[1] == req.params.password) {
			console.log('Access granted!');
			res.statusCode = 200;
			res.send({
				"authenticated": true,
				"user": credential[0]
			});
		} else {
			res.statusCode = 403;
			res.send({'authenticated': false});
		}
	}

});


app.get('/eicar', function(req, res) {
	res.send("X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*");
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(process.env.PORT || 8080);
  console.log('INFO: HTTPSRV started');
}

module.exports = app;