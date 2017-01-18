'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartTask = undefined;

var _path = require('path');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

require('shelljs/global');

var _index = require('../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CWD = process.cwd();
var SmartRootPath = (0, _path.resolve)(__dirname, '..', '..');
var TemplatePath = (0, _path.resolve)(__dirname, '..', '..', 'bin/templates');

var smartConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync((0, _path.resolve)(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

var getTaskFunctionConfig = function getTaskFunctionConfig() {
	var applicationConfig = void 0;
	try {
		applicationConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync((0, _path.resolve)(__dirname, '..', 'config/smart-config.yml'), 'utf8'));
	} catch (e) {
		console.log('Read smart-config.yml file error: ', e);
	}

	console.log(applicationConfig);
	return applicationConfig;
};

// getTaskFunctionConfig()

// in directory of framework and project child
var notExcuteAction = function notExcuteAction() {};

console.log(__filename);
var checkWorkDirectory = function checkWorkDirectory() {

	if (CWD.includes('/framework') || CWD.includes('/' + smartConfig.clientDir) /* || !(fs.existsSync(CWD + '/package.json') && fs.existsSync(CWD + `/${smartConfig.clientDir}/`))*/) {
			console.log('not excute commander lines, because you not at root project directory.');
			return;
		}

	if (!_fs2.default.existsSync(CWD + '/package.json')) {
		console.log('First, you should create project which you do.');
		cp('-f', TemplatePath + '/normal/package.json', './');
		cp('-f', TemplatePath + '/normal/smart-config.yml', './');
		cp('-R', TemplatePath + '/normal/src', './');
		return;
	}

	// if (fs.existsSync(ROOT_PATH + '/smart-config.js')) {
	// 	console.log('initializated work derectory');
	// } else {
	// 	console.log('not initial work derectory');
	// }
};

var initialization = function initialization() {};

var smartTask = {
	execute: function execute(config, info) {
		//console.log('execute task', info)
		_index.server.start();
		checkWorkDirectory();
	}
};

exports.smartTask = smartTask;