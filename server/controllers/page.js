var logger = require('../utils/logger.js');
var handleAPI = require('../utils/util.js').handleControllerAPI;

exports.controller = function(app) {
	app.get('/test', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			resp.json({
				ok: true,
				msg: 'test api'
			});
		});
	});

	app.post('/login', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			var email = req.body.email;
			req.session.email = email;
			resp.json({ ok: true });
			logger.info('logined', { email: email });
		});
	});

	app.post('/logout', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			req.session.destroy(function(err) {
				if(err) logger.error('error', err);
				resp.json({ ok: true });
			});
		});
	});
};