'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.webpackConfigFun = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @pages <String | Object>
 * @vendors <Array>
 * desc: to create a single page application when pages argument is String.
 *			 If pages argument is Object to create multi page application.
 * refLink: https://webpack.js.org/concepts/entry-points/
 */
var getEntry = function getEntry(pages, vendors) {
	var entry = {};
	if ((typeof pages === 'undefined' ? 'undefined' : _typeof(pages)) === 'object') {
		for (var point in pages) {
			entry[point] = [];
		}
		return entry;
	}

	// return { bundle: [ resolve() ], ...entry};
};

var configuration = function configuration(config) {
	// const config = {};

	return {
		// entry: getEntry()
	};
};

var webpackConfigFun = exports.webpackConfigFun = configuration;