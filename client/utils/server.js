var request = require('superagent');
var Promise = require('promise');

var getReq = function(url, args, callback) {
	return new Promise(function(resolve, reject) {
		var req = request.get(url);
		if(args != null) req = req.query(args);
		req.end(function(err, resp) {
			if(err) {
				console.error(err.stack);
				reject(err);
				return;
			}
			if(resp.ok === true) {
				var resolveData = callback(resp.body);
				resolve(resolveData);
				return;
			}
			reject(resp.errmsg);
		});
	});
};

module.exports = {
	test: function(args) {
		return getReq('/test', args, function(body) {
			return body.respMsg;
		});
	}
};