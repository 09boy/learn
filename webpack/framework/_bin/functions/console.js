'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// const colors = [
// 	{"Reset" , "\x1b[0m"}
// 	{"Bright" , "\x1b[1m"}
// 	{"Dim" , "\x1b[2m"}
// 	{"Underscore" , "\x1b[4m"}
// 	{"Blink" , "\x1b[5m"}
// 	{"Reverse" , "\x1b[7m"}
// 	{"Hidden" , "\x1b[8m"}

// 	{"FgBlack" , "\x1b[30m"}
// 	{"FgRed" , "\x1b[31m"}
// 	{"FgGreen" , "\x1b[32m"}
// 	{"FgYellow" , "\x1b[33m"}
// 	{"FgBlue" , "\x1b[34m"}
// 	{"FgMagenta" , "\x1b[35m"}
// 	{"FgCyan" , "\x1b[36m"}
// 	{"FgWhite" , "\x1b[37m"}

// 	{"BgBlack" , "\x1b[40m"}
// 	{"BgRed" , "\x1b[41m"}
// 	{"BgGreen" , "\x1b[42m"}
// 	{"BgYellow" , "\x1b[43m"}
// 	{"BgBlue" , "\x1b[44m"}
// 	{"BgMagenta" , "\x1b[45m"}
// 	{"BgCyan" , "\x1b[46m"}
// 	{"BgWhite" , "\x1b[47m"}
// ];

var RESET = '\x1b[0m';
var COLOR_START = '\x1b[36m';

var commonColorsObj = {
	warn: '\x1b[35m',
	error: '\x1b[31m',
	log: '\x1b[2m',
	tip: '\x1b[36m'
};

var print = function print(method) {
	var _console, _console2;

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	var color = commonColorsObj[method],
	    name = method.toUpperCase() + ' :: ';
	console[method] ? (_console = console)[method].apply(_console, ['\x1B[36m' + color, name].concat(args, [RESET])) : (_console2 = console).log.apply(_console2, ['\x1B[36m' + color, name].concat(args, [RESET]));
};

var Log = {
	warn: function warn() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		print.apply(undefined, ['warn'].concat(args));
	},
	error: function error() {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		print.apply(undefined, ['error'].concat(args));
	},
	tip: function tip() {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		print.apply(undefined, ['tip'].concat(args));
	},
	log: console.log
};

exports.default = Log;