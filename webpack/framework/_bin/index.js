#! /usr/bin/env node --harmony
'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _interactive = require('./interactive.js');

var _commander = require('./commander.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
	var DOC = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(__dirname + '/config/task-function-name-config.yml', 'utf8'));
	console.log(DOC);
	_interactive.smartInteractive.start(DOC);
	_commander.smartCommander.start(DOC);
} catch (e) {
	console.log(e);
}

console.log('boy-smart');