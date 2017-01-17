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

var _smartPath = require('./smart-path.js');

var _index = require('../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var checkWorkDirectory = function checkWorkDirectory() {
	if (!_fs2.default.existsSync(_smartPath.ROOT_PATH + '/package.json')) {
		console.log('First, you should create project which you do.');
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
		// server.start();
		checkWorkDirectory();
	}
};

exports.smartTask = smartTask;