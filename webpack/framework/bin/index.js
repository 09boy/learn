#! /usr/bin/env node --harmony

import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { smartInteractive } from './functions/interactive.js';
import { smartCommander } from  './functions/commander.js';
import { smartTask } from './functions/actions.js';

console.log('###########');

// let b = fs.readFileSync( __dirname + '/.boy-smart', 'utf8')
// console.log('bbbb', b);

const checkDevEnv = () => {
	if (__dirname.split('/').pop() === '_bin'/* && fs.existsSync(resolve(__dirname, '.boy-smart'))*/) {
		cp('-R', resolve(__dirname, '..', 'bin/config'), './_bin');
	}
};

const executeInteractiveAction = config => {
	smartInteractive
		.help(config)
		.then(answers => {
			console.log(answers, '//////// ');
			smartTask.execute(config[answers.action], answers);
		})
		.catch(e => { console.log('error from executeInteractiveAction function: ', e);});
};

const executeCommander = config => {
	smartCommander
		.start(config)
		.then(commandInfo => {
			commandInfo.isUnknowCommand ? executeInteractiveAction(config) : smartTask.execute(config[commandInfo.action], commandInfo);
	  })
		.catch(e => { console.log('smartCommander promise error: ', e);});
};

const getTaskFunctionConfig = () => {
	let taskFunctionConfig;
	try { taskFunctionConfig = yaml.safeLoad(fs.readFileSync( __dirname + '/config/task-function-config.yml', 'utf8'));}
	catch (e) { console.log('Read task-function-config.yml file error: ', e); }
	return taskFunctionConfig;
};

const run = () => {
	checkDevEnv();
	executeCommander(getTaskFunctionConfig());
};

run();
console.log('boy-smart', __dirname.split('/').pop())
