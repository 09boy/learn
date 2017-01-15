#! /usr/bin/env node --harmony
'use strict';

var _path = require('path');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

require('shelljs/global');

var _interactive = require('./functions/interactive.js');

var _commander = require('./functions/commander.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (__dirname.split('/').pop() === '_bin') {
	cp('-R', (0, _path.resolve)(__dirname, '..', 'bin/config'), './_bin');
}

try {
	(function () {
		var DOC = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(__dirname + '/config/task-function-config.yml', 'utf8'));
		_commander.smartCommander.start(DOC).then(function (commandObj) {
			console.log('...promise value is ', commandObj);
			if (commandObj.isUnknowCommand) {
				_interactive.smartInteractive.help(DOC);
			} else {}
		}).catch(function (e) {
			console.log('smartCommander promise error: ', e);
		});
	})();
} catch (e) {
	console.log('Read ymal file error: ', e);
}

console.log('boy-smart', __dirname.split('/').pop());