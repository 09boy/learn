'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartCommander = undefined;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let list = () => {
// 	console.log('commander in');
// };

_commander2.default.version('0.0.1');

console.log(_commander2.default.option);

var smartCommander = {
	start: function start(config) {}
};

exports.smartCommander = smartCommander;