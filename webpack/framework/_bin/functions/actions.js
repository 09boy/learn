'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartAction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

require('shelljs/global');

var _tasks = require('./tasks.js');

var Task = _interopRequireWildcard(_tasks);

var _console = require('./console.js');

var _console2 = _interopRequireDefault(_console);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CWD = process.cwd();

var smartConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync((0, _path.resolve)(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

// const installInfoJSON = {installed: false, baseDir: null};

/**
 * Checking before executing task:
 * 
 * Step 1.  Whether the file of package.json and .boy-smart exist in the current directory.
 *      1.1 Existing      ->  Go Step 4
 *      1.2 Not Existing  ->  Go Step 2
 *
 * Step 2.  Nothing 'smart' Project or Not at root directory of 'smart' Project.
 *      2.1 To find files of Step 1 at the parent directory until more than 9 levels to end; get warning and stop task of executing if both files have existed in the parent directory where less than 10 levels.
 *			2.2 Not finding up  ->  Go Step 3
 * 
 * Step 3.  Creating new 'smart' Project  in the current directory and installing dependency packages.
 * 
 * Step 4.  Executing task
 */

var isExistInstallFiles = function isExistInstallFiles(path) {
	return _fs2.default.existsSync(path + 'package.json') && _fs2.default.existsSync(path + '.boy-smart');
};

var isFrameworkDirectory = function isFrameworkDirectory() {
	if (_fs2.default.existsSync('.framework-env') || CWD.includes('/framework')) {
		_console2.default.error('In addition to upgrade you cannot do anything at the place where is framework directory.');
		return true;
	}
	return false;
};

var isInProjectRootDir = function isInProjectRootDir() {
	var condition = isExistInstallFiles(process.cwd() + '/');
	return new Promise(function (resolve, reject) {
		condition ? resolve() : reject();
	});
};

var isRejectExecAction = function isRejectExecAction() {
	var condition = CWD.includes('/framework');
	if (condition) _console2.default.error('Reject execute command lines, because you not at root directory of project .');
	return condition;
};

var toUpFindFile = function toUpFindFile(condition) {
	var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

	var result = false,
	    s_date = new Date().getTime();

	_console2.default.tips('Checking whether project is exist.');
	var dirPath = '';

	while (--level) {
		dirPath += '../';
		if (condition(dirPath)) {
			result = true;
			break;
		}
	}

	var e_date = new Date().getTime(),
	    tookMs = e_date - s_date;
	_console2.default.tips('Took ' + tookMs + ' seconds.');
	if (result) {
		_console2.default.warn('You has created Project in ' + (0, _path.resolve)(dirPath) + ', please back to Project Root Directory executing command line.');
	}

	return new Promise(function (resolve, reject) {
		if (result) {
			reject('existed');
		} else {
			_console2.default.warn('You can use "smart || smart project <name> [mode]" command line to create new Project.');
			resolve('new-project');
		}
	});
};

var checkWorkDirectory = function checkWorkDirectory() {
	return new Promise(function (resolve, reject) {
		if (!isFrameworkDirectory()) {
			isInProjectRootDir().then(resolve).catch(function () {
				return toUpFindFile(isExistInstallFiles);
			}).then(function (msg) {
				resolve(msg);
			});
		}
	});
};

var smartAction = {
	execute: function execute(config, info) {
		if (info.action === 'upgrade') {
			Task[info.action]();return;
		}

		checkWorkDirectory().then(function (msg) {
			if (!msg && info.action === 'project') {
				_console2.default.error('Do not create new Project at the place where has had "smart" project.');return;
			} else if (msg === 'new-project' && info.action !== 'project') {
				return;
			}

			info.argument.host = info.argument.host || smartConfig.host;
			info.argument.port = info.argument.port || smartConfig.port;
			console.log('exec task....');
			Task[info.action](_extends({}, info, { smartConfig: smartConfig }));
		});
	}
};

exports.smartAction = smartAction;