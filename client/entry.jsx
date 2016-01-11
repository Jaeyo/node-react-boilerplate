var React = require('react');
var ReactDOM = require('react-dom');
var QS = require('query-string');
var util = require('./utils/util.js');
var server = require('./utils/server.js');
require('./reset.css');

var request = require('superagent');

util.init();

function getDOM() {
	var pathname = window.location.pathname;
	var params = QS.parse(location.search);

	try {
		if(pathname === '/') {
			return (<div>index</div>);
		}
	} catch(err) {
		//TODO
	}
}

ReactDOM.render(
	getDOM(),
	document.getElementById('container')
);