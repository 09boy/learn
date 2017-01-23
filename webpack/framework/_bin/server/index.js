'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.server = undefined;

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _config = require('../webpack/config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('*', function (req, rep) {
	rep.set('Content-Type', 'text/html');
	rep.sendFile((0, _path.resolve)(__dirname, '..', '..', 'bin/template.html'));
});

var server = {
	start: function start(port, host) {
		app.listen(port, function () {
			console.log('start server... port is ' + port);
		});
	}
};

exports.server = server;