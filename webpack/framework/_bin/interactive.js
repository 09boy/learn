'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.smartInteractive = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configObj = void 0;

var getQuestions = function getQuestions(config) {
	console.log('initialization...');
	var questions = {
		type: 'list',
		name: 'App interactive inquirer',
		message: 'What do you want to do?',
		choices: []
	};
	for (var key in config) {
		questions.choices.push({
			name: key,
			value: config[key]
		});
	}
	return questions;
};

var task = function task(questions) {
	_inquirer2.default.prompt(questions).then(function (answers) {
		console.log('then recived value is ', answers);
	});
};

var smartInteractive = {
	start: function start(config) {
		// configObj = config;
		// task(getQuestions(config));
		getQuestions(config);
	}
};

// const questions = [
// 	{
// 		type: 'list',
// 		name: 'App interactive inquirer',
// 		message: 'What do you want to do?',
// 		choices: [
// 			{
// 				name: 'Development',
// 				value: 'development'
// 			},
// 			{
// 				name: 'Compress',
// 				value: 'compress'
// 			},
// 			{
// 				name: 'Mocha Test',
// 				value: 'code-test'
// 			},
// 			{
// 				name: 'Clints',
// 				value: 'code-clints'
// 			},
// 			{
// 				name: 'Create Project',
// 				value: 'new-project'
// 			},
// 			{
// 				name: 'Create React & Redux Project',
// 				value: 'new-react-redux-project'
// 			},
// 			{
// 				name: 'Create React-Native & Reudx Project',
// 				value: 'new-react-native-redux-project'
// 			},
// 			{
// 				name: 'Create Page',
// 				value: 'new-page'
// 			},
// 			{
// 				name: 'Create React Page',
// 				value: 'react-react-page'
// 			},
// 			{
// 				name: 'Create Component',
// 				value: 'new-component'
// 			},
// 			{
// 				name: 'Upgrade',
// 				value: 'upgrade'
// 			}
// 		]/*,
// 		validate: input => {
// 			console.log('validate recived value is ' + input);
// 			// return true;
// 		}*/
// 	}
// ];

exports.smartInteractive = smartInteractive;