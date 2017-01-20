'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartCommander = undefined;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var resolveObj = { isUnknowCommand: true };

var checkHostParam = function checkHostParam(value) {
	var vals = value.split('.');
	var result = false;
	if (vals.length == 4 && vals.every(function (val) {
		return !isNaN(val) && parseInt(val);
	})) {
		result = value;
	}
	return result;
};

var setVersion = function setVersion() {
	_commander2.default.version('0.0.1').option('-P --port <n>', 'port desc', parseInt).option('-H --host <string>', 'hostname for server', checkHostParam).description('please use -h with certain command loop options.\n example: smart start -h');
};

var setUnknowCommand = function setUnknowCommand() {
	_commander2.default.command('*').action(function (env) {
		resolveObj.isUnknowCommand = true;
	});
};

var setHelp = function setHelp() {
	_commander2.default.on('--help', function () {
		console.log('  Examples:');
		console.log('');
		console.log('    $ custom-help --help');
		console.log('    $ custom-help -h');
		console.log('');
	});
};

var setCommand = function setCommand(obj, key) {
	var p = _commander2.default.command(obj.command);
	for (var c in obj) {
		if (c !== 'command') {
			p[c.includes('-') ? c.split('-')[0] : c].apply(p, _toConsumableArray(obj[c]));
		}
	}
	p.action(function (arg, options) {
		return parseAnswers(key, arg, options);
	});
};

var setCommands = function setCommands(config) {
	for (var key in config) {
		setCommand(config[key]['command-config'], key);
	}
};

var parseAnswers = function parseAnswers(action, arg, args) {
	// console.log('action: arguments...',arg, ' .... ', typeof args);
	var otherArgs = args instanceof Array ? args : [];
	console.log(otherArgs);

	Object.assign(resolveObj, {
		isUnknowCommand: false,
		action: action,
		argument: _defineProperty({
			port: _commander2.default.port,
			host: _commander2.default.host
		}, action, [arg].concat(_toConsumableArray(otherArgs)))
	});
};

var initial = function initial(config) {
	setVersion();
	setUnknowCommand();
	setHelp();
	setCommands(config);
	_commander2.default.parse(process.argv);
};

var smartCommander = {
	exec: function exec(config) {
		initial(config);
		var p = new Promise(function (resolve, reject) {
			resolve(resolveObj);
		});
		return p;
	}
};

exports.smartCommander = smartCommander;