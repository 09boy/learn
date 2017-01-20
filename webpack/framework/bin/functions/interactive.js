import inquirer from 'inquirer';

const RootQuestionName = 'Select Action:';
const ChildQuestionIdentifier = 'child-question';

let result = {action: null, argument: {}};
let matchRootKey = {};

const getRootQuestions = config => {
	const questions = {
		type: 'list',
		name: RootQuestionName,
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

const hasChildInteractive = parentConfig => {
	return typeof parentConfig[ChildQuestionIdentifier] === 'object';
};

const execChildInteractive = parentConfig => {
	let childConfig = parentConfig[ChildQuestionIdentifier]
	if (matchRootKey[parentConfig.name]) {
		Object.assign(result, {action: matchRootKey[parentConfig.name]});
	}
	return getChildQuestions(childConfig);
};

const answerCallback = answers => {
	let rootAnswer = answers[RootQuestionName];
	if (rootAnswer && !hasChildInteractive(rootAnswer)) {
			Object.assign(result, {action: matchRootKey[rootAnswer.name]});
			// console.log('exet root...');
	} else {
		let parentConfig;
		for (let key in answers) { parentConfig = answers[key]; }
		if (hasChildInteractive(parentConfig)) {
			// console.log('exec child...');
			return execChildInteractive(parentConfig);
		} else {
			Object.assign(result, {argument: {[result.action]: parentConfig.split(' ')}});
			// console.log('child exec end...');
		}
	}
	// console.log('ok......', result);
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
