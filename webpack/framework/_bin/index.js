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

var _actions = require('./functions/actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDevEnv = function checkDevEnv() {
	if (__dirname.split('/').pop() === '_bin') {
		cp('-R', (0, _path.resolve)(__dirname, '..', 'bin/config'), './_bin');
	}
};

var executeInteractiveAction = function executeInteractiveAction(config) {
	_interactive.smartInteractive.help(config).then(function (answers) {
		console.log(answers, '//////// ');
		_actions.smartTask.execute(config[answers.action], answers);
	}).catch(function (e) {
		console.log('error from executeInteractiveAction function: ', e);
	});
};

var executeCommander = function executeCommander(config) {
	_commander.smartCommander.start(config).then(function (commandInfo) {
		commandInfo.isUnknowCommand ? executeInteractiveAction(config) : _actions.smartTask.execute(config[commandInfo.action], commandInfo);
	}).catch(function (e) {
		console.log('smartCommander promise error: ', e);
	});
};

var getTaskFunctionConfig = function getTaskFunctionConfig() {
	var taskFunctionConfig = void 0;
	try {
		taskFunctionConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(__dirname + '/config/task-function-config.yml', 'utf8'));
	} catch (e) {
		console.log('Read task-function-config.yml file error: ', e);
	}
	return taskFunctionConfig;
};

var run = function run() {
	checkDevEnv();
	executeCommander(getTaskFunctionConfig());
};

run();
console.log('boy-smart', __dirname.split('/').pop());