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

var _console = require('./console.js');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CWD = process.cwd();
var SmartRootPath = (0, _path.resolve)(__dirname, '..', '..');
var TemplatePath = (0, _path.resolve)(__dirname, '..', '..', 'bin/templates');

var smartConfig = _jsYaml2.default.safeLoad(_fs2.default.readFileSync((0, _path.resolve)(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

// const installInfoJSON = {installed: false, baseDir: null};

// const getDirectories = srcpath => {
//   return fs.readdirSync(srcpath).filter(function(file) {
//     return fs.statSync(resolve(srcpath, file)).isDirectory();
//   });
// }

/**
 * 执行任务前检查
 * 
 * 1. 先读取当前目录是否有 package.json & .boy-smart
 *   1.1 存在  --> step 4
 *   1.2 不存在 --> step 2
 * 2. 未建立项目 或者 不在项目根目录
 *   2.1 最多往上查找10级目录，是否有满足条件 step 1;  note: 不会向下查找
 *   2.1.1 存在 -->  拒绝执行任务 并发出警告提示
 *   2.1.2 不存在 --> step 3
 * 3. 建立项目
 * 4. 已经初始化并且在项目根目录可执行任务
 */

var isExistInstallFiles = function isExistInstallFiles(path) {
	return _fs2.default.existsSync(path + 'package.json') && _fs2.default.existsSync(path + '.boy-smart');
};

var isFrameworkDirectory = function isFrameworkDirectory() {
	if (_fs2.default.existsSync('.framework-env')) {
		_console2.default.error('You can not initial project at the place where is framework directory.');
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

// const isProjectInitialization= () => {
// 	let conditaion = fs.existsSync(CWD + '/package.json');
// 	if (!conditaion) Log.tips('Initialize the project...');
// 	return conditaion
// };

var initializeProject = function initializeProject() {
	var baseDir = process.cwd() + '/';
	_console2.default.tips('Create new Project at ' + baseDir);

	/*if (!fs.existsSync('./.body-smart')) { touch(`${baseDir}.boy-smart`); }
 // override
 fs.writeFile('./.boy-smart', `{"installed": false, "baseDir": ${baseDir}}`, err => {
 	if (err) throw err;
 	console.log('It is saved')
 });
 	cp('-f',`${TemplatePath}/normal/package.json`,baseDir);
 cp('-f',`${TemplatePath}/normal/smart-config.yml`, baseDir);
 cp('-R',`${TemplatePath}/normal/src`, baseDir);
 if (smartConfig.clientDir !== 'src') { mv(`${baseDir}src`, '${baseDir}${smartConfig.clientDir}')}
 	// installing package
 exec('npm install');*/
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

	var e_date = new Date().getTime();
	var tookMs = e_date - s_date;
	_console2.default.tips('Took ' + tookMs + ' seconds.');
	if (result) {
		_console2.default.warn('You has created Project in ' + (0, _path.resolve)(dirPath) + ', please back to Project Root Directory executing command line.');
		// cd(dirPath)
		// console.log(process.cwd());
	}

	return new Promise(function (resolve, reject) {
		if (result) {
			resolve('sucess');
		} else {
			_console2.default.warn('You can use "smart || smart project <name> [mode]" command line to create new Project.');
			reject('new project');
		}
	});
};

var checkWorkDirectory = function checkWorkDirectory() {

	return new Promise(function (resolve, reject) {
		if (!isFrameworkDirectory()) {
			isInProjectRootDir().then(resolve).catch(function () {
				return toUpFindFile(isExistInstallFiles);
			}).catch(function (msg) {
				resolve(msg);
			});
		}
	});

	// return Promise.all([isFrameworkDirectory(), isInProjectRootDir().catch(checkOutInstallFiles)]).then(values => {
	// 	Promise.resolve('check success')
	// 	console.log('all::', values);
	// })

	// if (fs.existsSync(ROOT_PATH + '/smart-config.js')) {
	// 	console.log('initializated work derectory');
	// } else {
	// 	console.log('not initial work derectory');
	// }
};

var initialization = function initialization() {};

var smartTask = {
	execute: function execute(config, info) {
		// console.log(info);
		// checkWorkDirectory().then(msg => {
		// 	console.log('exec task....', msg);
		// 	if (msg) {
		// 		initializeProject();
		// 	}

		// 	info.argument.host = info.argument.host || smartConfig.host
		// 	info.argument.port = info.argument.port || smartConfig.port
		// 	// console.log('execute task', info)
		// 	// server.start();
		// })
	}
};

exports.smartTask = smartTask;