let request = require('supertest'),
	app = require ('../server.js'),
	assert = require('assert'),
	mocha = require('mocha');

describe('GET status 200', () => {
	it('should returns 200', (done) => {
		request(app)
			.get('/status/200')
			.expect(200, done);
	});
});

describe('GET status 404', () => {
	it('should returns 404', (done) => {
		request(app)
			.get('/status/404')
			.expect(404, done);
	});
});

describe('GET /', () => {
	it('should returns I\'m here', (done) => {
		request(app)
			.get('/')
			.expect(200, 'I\'m here !', done);
	})
})

describe('GET /get?var=value', () => {
	it('should returns json', (done) => {
		request(app)
			.get('/get?var=value')
			.expect(200, '{"args":{"var":"value"}}', done);
	})
})
