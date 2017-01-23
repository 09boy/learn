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

var executeInteractiveAction = function executeInteractiveAction(config) {
	_interactive.smartInteractive.help(config).then(function (answers) {
		_actions.smartTask.execute(config[answers.action], answers);
	});
};

var executeCommander = function executeCommander(config) {
	_commander.smartCommander.exec(config).then(function (commandInfo) {
		commandInfo.isUnknowCommand ? executeInteractiveAction(config) : _actions.smartTask.execute(config[commandInfo.action], commandInfo);
	});
};

var getTaskFunctionConfig = function getTaskFunctionConfig() {
	var taskFunctionConfig = void 0;
	try {
		taskFunctionConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync((0, _path.resolve)(__dirname, '..', 'bin/config/task-function-config.yml'), 'utf8'));
	} catch (e) {
		console.log('Read task-function-config.yml file error: ', e);
	}
	return taskFunctionConfig;
};

executeCommander(getTaskFunctionConfig());