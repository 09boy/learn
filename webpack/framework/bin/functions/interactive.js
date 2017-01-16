import inquirer from 'inquirer';

let result = {action: null, argument: null};
let matchRootKey = {};

const getRootQuestions = config => {
	const questions = {
		type: 'list',
		name: 'Select Action:',
		message: 'What do you want to do?',
		choices: []
	};
	let name;
	for (let key in config) {
		name = config[key].name;
		questions.choices.push({
			name,
			value: config[key]
		});
		matchRootKey[name] = key;
	}
	return [questions];
};

const getChildQuestions = config => {
	const questions = {};
	for (let key in config) {
		questions[key] = config[key];
	}
	return setQuerstions(questions);
};

const answerCallback = answers => {
	let isAnswerFromRootLevel = answers['Select Action:'] ? true : false;
	if (isAnswerFromRootLevel) {
		let rootConfig = answers['Select Action:'];
		let childConfig = rootConfig['child-interactive'];
		
		result = {
			action: matchRootKey[rootConfig.name],
			argument: childConfig ? childConfig.name : null
		}

		if (typeof childConfig === 'object') {
			return getChildQuestions(childConfig);
		}
	} else {
		console.log('answers from children level', answers[result.argument]);
		result.argument = answers[result.argument];
	}
	
	return new Promise((resolve, reject) => {
		resolve(result)
	});
};

const setQuerstions = questions => {
	return inquirer
		.prompt(questions)
		.then(answerCallback);
};

const smartInteractive = {
	help: config => {
		return setQuerstions(getRootQuestions(config));
	}
};

export { smartInteractive }
