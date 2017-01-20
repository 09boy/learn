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

var installInfoJSON = { installed: false, baseDir: null };

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
	return _fs2.default.existsSync(path + 'package.json') && _fs2.default.existsSync(dirPath + '.boy-smart');
};

var isInProjectRootDir = function isInProjectRootDir() {
	var condition = isExistInstallFiles('./'); //fs.existsSync('./package.json') && fs.existsSync('./.boy-smart')
	_console2.default.tip('Do you in project root directory: ', condition);
	return new Promise(function (resolve, reject) {
		condition ? resolve() : reject();
	});
};

var isRejectExecAction = function isRejectExecAction() {

	// CWD.includes(`/${smartConfig.clientDir}`)
	var condition = CWD.includes('/framework');
	if (condition) _console2.default.error('Reject execute command lines, because you not at root directory of project .');
	return condition;
};

var isProjectInitialization = function isProjectInitialization() {
	var conditaion = _fs2.default.existsSync(CWD + '/package.json');
	if (!conditaion) _console2.default.tip('Initialize the project...');
	return conditaion;
};

var initializeProject = function initializeProject() {
	// if (!fs.existsSync('./.body-smart')) touch('./.boy-smart');

	// fs.writeFile('./.boy-smart', '{install: true}', err => {
	// 	if (err) throw err;

	// 	console.log('It is saved')
	// })

	// fs.readFile('./.boy-smart', 'utf8', (err, data) => {
	// 	if (err) throw err;

	// 	console.log(JSON.parse(data));
	// })
	// cp('-f',`${TemplatePath}/normal/package.json`,'./');
	// cp('-f',`${TemplatePath}/normal/smart-config.yml`,'./');
	// cp('-R',`${TemplatePath}/normal/src`,'./');
	// if (smartConfig.clientDir !== 'src') { mv('./src', './${smartConfig.clientDir}')}
};

// const findFile = () => {
// 	let level = 10;
// 	// console.log(__dirname, CWD.split('/').pop());
// 	Log.tip('loop dirs to find intall-files that are package.json and .boy-smart');
// 	let s_date = new Date();
// 	s_date = s_date.getTime();
// 	let josnFil, smartFile, result = false, dirPath = '';
// 	while (--level) {
// 		dirPath += '../'
// 		josnFil = fs.existsSync(dirPath + 'package.json')
// 		smartFile = fs.existsSync(dirPath + '.boy-smart')
// 		console.log(level);
// 		if (josnFil && smartFile) {
// 			result = true
// 			break 
// 		}
// 	}

// 	let e_date = new Date();
// 	console.log('use ms ::: ', (e_date.getTime() - s_date));
// 	console.log('find file result : ', result);
// };


var findFile = function findFile(condition) {
	var level = 10;
	var result = false;
	var s_date = new Date().getTime();

	var dirPath = '';

	while (--level) {
		dirPath += '../';
		if (condition(dirPath)) {
			result = true;
			console.log('find up');
			break;
		}
	}

	var e_date = new Date().getTime();
	var useMs = s_date - e_date;

	_console2.default.tip('FindFile Result ::', result, ' ====  Use ms : ', useMs);
};

var toUpFindFile = function toUpFindFile(path) {
	return false;
};

var checkWorkDirectory = function checkWorkDirectory() {

	isInProjectRootDir().catch(findFile(isExistInstallFiles));

	// findFile();
	// if (isRejectExecAction()) { return }

	// if (!isProjectInitialization()) { initializeProject(); }

	// if (fs.existsSync(ROOT_PATH + '/smart-config.js')) {
	// 	console.log('initializated work derectory');
	// } else {
	// 	console.log('not initial work derectory');
	// }

	console.log('exec task...');
};

var initialization = function initialization() {};

var smartTask = {
	execute: function execute(config, info) {
		info.argument.host = info.argument.host || smartConfig.host;
		info.argument.port = info.argument.port || smartConfig.port;
		console.log('execute task', info);
		// server.start();
		checkWorkDirectory();
	}
};

exports.smartTask = smartTask;