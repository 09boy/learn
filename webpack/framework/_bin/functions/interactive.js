'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartInteractive = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RootQuestionName = 'Select Action:';
var ChildQuestionIdentifier = 'child-question';

var result = { action: null, argument: {} };
var matchRootKey = {};

var getRootQuestions = function getRootQuestions(config) {
	var questions = {
		type: 'list',
		name: RootQuestionName,
		message: 'What do you want to do?',
		choices: []
	};
	var name = void 0;
	for (var key in config) {
		name = config[key].name;
		questions.choices.push({
			name: name,
			value: config[key]
		});
		matchRootKey[name] = key;
	}
	return [questions];
};

var getChildQuestions = function getChildQuestions(config) {
	var questions = {};
	for (var key in config) {
		questions[key] = config[key];
	}
	return setQuerstions(questions);
};

var hasChildInteractive = function hasChildInteractive(parentConfig) {
	return _typeof(parentConfig[ChildQuestionIdentifier]) === 'object';
};

var execChildInteractive = function execChildInteractive(parentConfig) {
	var childConfig = parentConfig[ChildQuestionIdentifier];
	if (matchRootKey[parentConfig.name]) {
		Object.assign(result, { action: matchRootKey[parentConfig.name] });
	} else {
		Object.assign(result, { option: childConfig.val });
	}
	return getChildQuestions(childConfig);
};

var answerCallback = function answerCallback(answers) {
	var rootAnswer = answers[RootQuestionName];
	if (rootAnswer && !hasChildInteractive(rootAnswer)) {
		Object.assign(result, { action: matchRootKey[rootAnswer.name] });
		// console.log('exet root...');
	} else {

		var parentConfig = void 0;
		for (var key in answers) {
			parentConfig = answers[key];
		}
		if (hasChildInteractive(parentConfig)) {
			//console.log('exec child...', parentConfig);
			return execChildInteractive(parentConfig);
		} else {
			Object.assign(result, { argument: _defineProperty({}, result.action, parentConfig.split(' ')) });
			// console.log('child exec end...');
		}
	}
	// console.log('ok......', result);
	return new Promise(function (resolve, reject) {
		resolve(result);
	});
};

var setQuerstions = function setQuerstions(questions) {
	return _inquirer2.default.prompt(questions).then(answerCallback);
};

var smartInteractive = {
	help: function help(config) {
		return setQuerstions(getRootQuestions(config));
	}
};

exports.smartInteractive = smartInteractive;