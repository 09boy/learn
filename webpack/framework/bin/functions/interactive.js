import inquirer from 'inquirer';

const mainQuestionHead = {
	type: 'list',
	name: 'Select Action:',
	message: 'What do you want to do?',
	choices: []
};

const getQuestions = config => {
	console.log('initialization...');
	const questions = {
		type: 'list',
		name: 'Select Action:',
		message: 'What do you want to do?',
		choices: []
	};
	for (let key in config) {
		questions.choices.push({
			name: config[key].name,
			value: config[key]
		});
	}
	console.log(config.page['child-interactive']);
	return questions;
};

const getQuestions1 = config => {


};

const setQuerstions = questions => {
	inquirer
		.prompt(questions)
		.then(answers => {
			//console.log('then recived value is ' , {name: answers['Execute Action:'].name, task: answers['Execute Action:'].task});

		});
};

const smartInteractive = {
	help: config => {
		// console.log({header: mainQuestionHead ,config});
		setQuerstions(getQuestions(config));
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

export { smartInteractive }

