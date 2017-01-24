'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.upgrade = exports.git = exports.component = exports.page = exports.project = exports.lint = exports.test = exports.pack = exports.start = undefined;

var _path = require('path');

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

/*

	{ action: 'project',
  argument:
   { project: [ 'home', 'work', 'lit' ],
     host: '0.0.0.0',
     port: 3030 },
  option: 'Normal' }

*/

var initializeProject = function initializeProject() {
	var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Normal';
	var smartConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	var baseDir = process.cwd() + '/' + name;
	_console2.default.process('Creating new \'' + mode + ' Project\' at ' + baseDir);

	mkdir('-p', baseDir);
	baseDir += '/';
	if (!_fs2.default.existsSync(baseDir + '.body-smart')) {
		touch(baseDir + '.boy-smart');
	}
	// override
	_fs2.default.writeFile(baseDir + '.boy-smart', '{"installed": false, "baseDir": ' + baseDir + ', "project-mode": ' + mode + '}', function (err) {
		if (err) throw err;
	});

	mode = mode.toLowerCase();
	cp('-f', TemplatePath + '/' + mode + '/package.json', baseDir);
	cp('-f', TemplatePath + '/' + mode + '/smart-config.yml', baseDir);
	cp('-f', TemplatePath + '/' + mode + '/template.html', baseDir);
	cp('-R', TemplatePath + '/' + mode + '/src', baseDir);
	if (smartConfig.clientDir !== 'src') {
		mv(baseDir + 'src', '${baseDir}${smartConfig.clientDir}');
	}
	_console2.default.process('Downloaded installation files.');
	_console2.default.tips('You can do something to Entry ' + name + ' derectory.');
};

var checkDependencyPackage = function checkDependencyPackage() {
	if (!_fs2.default.existsSync('./node_modules')) {
		_console2.default.process('Installing dependency packages...');
		exec('npm install');
		_console2.default.process('Install completed.');
	}
};

var start = function start(info) {
	checkDependencyPackage();
	_index.server.start(info.argument.port, info.argument.host);
};

var pack = function pack(info) {
	console.tips('Developing...');
};

var test = function test(info) {
	console.tips('Developing...');
};

var lint = function lint(info) {
	console.tips('Developing...');
};

var project = function project(info) {
	var argument = info.argument;
	initializeProject(argument[info.action][0], argument.option, info.smartConfig);
};

var page = function page(info) {
	console.tips('Developing...');
};

var component = function component(info) {
	console.tips('Developing...');
};

var git = function git(info) {
	console.tips('Developing...');
};

var upgrade = function upgrade(info) {
	_console2.default.process('Upgrading...');
};

exports.start = start;
exports.pack = pack;
exports.test = test;
exports.lint = lint;
exports.project = project;
exports.page = page;
exports.component = component;
exports.git = git;
exports.upgrade = upgrade;