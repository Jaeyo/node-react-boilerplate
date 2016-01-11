var logger = require('../utils/logger.js');

var handle = function(req, resp, callback) {
		try {
			callback(req, resp);
		} catch(err) {
			logger.error(err.stack);
			resp.json({
				ok: false,
				err: err,
				errmsg: JSON.stringify(err)
			});
		}
	};


exports.controller = function(app) {

	app.get('/test', function(req, resp) {
		handle(req, resp, function(req, resp) {
			resp.json({
				ok: true,
				msg: 'test api'
			});
		});
	});

};