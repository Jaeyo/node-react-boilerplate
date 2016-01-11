var React = require('react');
var ReactDOM = require('react-dom');
var QS = require('query-string');
var util = require('./utils/util.js');
require('./reset.css');

var request = require('superagent');

util.init();


var LoginTestBox = React.createClass({
	getInitialState() {
		return { 
			isLogined: false
		};
	},

	login() {
		request
			.post('/login')
			.type('form')
			.send({
				email: 'tester@email.com'
			}).end(function(err, resp) {
				if(err) console.error(err);
				else {
					console.log({ resp: resp });
					if(resp.ok === true)
						this.setState({ isLogined: true });
				}
			}.bind(this));
	},

	logout() {
		request
			.post('/logout')
			.type('form')
			.end(function(err, resp) {
				if(err) console.error(err);
				else {
					console.log({ resp: resp });
					if(resp.ok === true)
						this.setState({ isLogined: false });
				}
			}.bind(this));
	},

	render() {
		try {
			return (
				<div>
					<div>is logined: {this.state.isLogined === true ? 'true' : 'false'}</div>
					<div>
						<button onClick={this.login}>login</button>
					</div>
					<div>
						<button onClick={this.logout}>logout</button>
					</div>
				</div>
			);
		} catch(err) {
			console.error(err);
		}
	}
});



function getDOM() {
	var pathname = window.location.pathname;
	var params = QS.parse(location.search);

	try {
		if(pathname === '/') {
			// return (<div>index</div>);
			return (<LoginTestBox />);
		}
	} catch(err) {
		//TODO
	}
}

ReactDOM.render(
	getDOM(),
	document.getElementById('container')
);
