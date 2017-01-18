'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('*', function (req, rep) {
	rep.set('Content-Type', 'text/html');
	rep.sendFile(_path2.default.resolve(__dirname, '..', '..', 'bin/template.html'));
});

var server = {
	start: function start() {
		app.listen('3000', function () {
			console.log('start server...');
		});
	}
};

exports.server = server;