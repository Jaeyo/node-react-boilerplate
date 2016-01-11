var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fs = require('fs');
var conf = require('./server/conf.js');
var logger = require('./server/utils/logger.js');
var app = express();

logger.info('server started', { port: conf.port });

app.set('port', conf.port);
app.set(bodyParser.json());
app.set(bodyParser.urlencoded({ extended: false }));
app.set(cookieParser());
app.use('/', express.static(path.join(__dirname, 'server/static')));

fs.readdirSync('./server/controllers').forEach(function(file) {
	if(file.substr(-3) == '.js') {
		var route = require('./server/controllers/' + file);
		route.controller(app);
	}
});

var server = app.listen(app.get('port'), function() {
	logger.info('express server listening on port ' + app.get('port'));
});