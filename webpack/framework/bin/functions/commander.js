import program from 'commander';


let resolveObj = {isUnknowCommand: true};


const checkHostParam = (value) => {
	let vals = value.split('.');
	let result = false;
	if (vals.length == 4 && vals.every(val => !isNaN(val) && parseInt(val))) {
		result = value
	}
	return result
}

const setVersion = () => {
program
		.version('0.0.1')
		.option('-P --port <n>', 'port desc', parseInt)
		.option('-H --host <string>', 'hostname for server', checkHostParam)
		.description('please use -h with certain command loop options.\n example: smart start -h');
};

const setUnknowCommand = () => {
	program
		.command('*')
		.action(env => {
			resolveObj.isUnknowCommand = true;
		});
};

const setHelp = () => {
	program.on('--help', function(){
		console.log('  Examples:');
		console.log('');
		console.log('    $ custom-help --help');
		console.log('    $ custom-help -h');
		console.log('');
	});
};

const setCommand = (obj, key) => {
	let p = program.command(obj.command);
	for (let c in obj) {
		if (c !== 'command') {
			p[c.includes('-') ? c.split('-')[0] : c](...obj[c]);
		}
	}
	p.action((arg, options) => parseAnswers(key, arg, options));
};

const setCommands = config => {
	for (let key in config) {
		setCommand(config[key]['command-config'], key);
	}
};

const parseAnswers = (action, arg, args) => {
		let _argv = process.argv;
		// _argv.shift();
		// _argv.shift();
		// console.log(_argv);
		// console.log('action: arguments...',arg, ' .... ',);

		// console.log(process.argv.toString().includes(',-'));

		let otherArgs = args instanceof Array ?  args : [];
		// console.log(otherArgs);
		Object.assign(resolveObj, {
			isUnknowCommand: false,
			action,
			argument: {
				port: program.port,
				host: program.host,
				[action]: [arg, ...otherArgs],
			}
		});
};

const initial = config => {
	setVersion();
	setUnknowCommand();
	setHelp();
	setCommands(config);
	program.parse(process.argv);
};


const smartCommander = {
	exec: config => {
		initial(config);
		let p = new Promise((resolve, reject) => {
			resolve(resolveObj)
		});
		return p;
	}
};

export { smartCommander };
