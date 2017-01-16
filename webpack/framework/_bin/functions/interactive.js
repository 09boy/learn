'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartInteractive = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = { action: null, argument: null };
var matchRootKey = {};

var getRootQuestions = function getRootQuestions(config) {
	var questions = {
		type: 'list',
		name: 'Select Action:',
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

var answerCallback = function answerCallback(answers) {
	var isAnswerFromRootLevel = answers['Select Action:'] ? true : false;
	if (isAnswerFromRootLevel) {
		var rootConfig = answers['Select Action:'];
		var childConfig = rootConfig['child-interactive'];

		result = {
			action: matchRootKey[rootConfig.name],
			argument: childConfig ? childConfig.name : null
		};

		if ((typeof childConfig === 'undefined' ? 'undefined' : _typeof(childConfig)) === 'object') {
			return getChildQuestions(childConfig);
		}
	} else {
		console.log('answers from children level', answers[result.argument]);
		result.argument = answers[result.argument];
	}

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