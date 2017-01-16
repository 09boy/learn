import program from 'commander';


let resolveObj = {isUnknowCommand: true};

const setVersion = () => {
program
		.version('0.0.1')
		.description('please use -h with certain command loop options.\n example: smart start -h');
};

const setUnknowCommand = () => {
	program
		.command('*')
		.action(env => {
			console.log('sb... unknow command');
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
	p.action((arg, options) => {
		console.log('action callback....', arg, options.exec_mode, key);
		Object.assign(resolveObj, {
			isUnknowCommand: false,
			action: key,
			argument: arg
		});
	});
};

const setCommands = config => {
	for (let key in config) {
		setCommand(config[key]['command-config'], key);
	}
};

const initial = config => {
	setVersion();
	setUnknowCommand();
	setHelp();
	setCommands(config);
	program.parse(process.argv);
};


const smartCommander = {
	start: config => {
		initial(config);
		let p = new Promise((resolve, reject) => {
			resolve(resolveObj)
		});
		return p;
	}
};

export { smartCommander };
