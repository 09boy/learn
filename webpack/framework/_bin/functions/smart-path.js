'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ROOT_PATH = exports.SMART_ROOT_PATH = undefined;

var _path = require('path');

var SMART_ROOT_PATH = (0, _path.resolve)(__dirname, '..', '..');
var ROOT_PATH = process.cwd();

// console.log('Root Path', ROOT_PATH);
// console.log('work root path', ROOT_PATH);

exports.SMART_ROOT_PATH = SMART_ROOT_PATH;
exports.ROOT_PATH = ROOT_PATH;