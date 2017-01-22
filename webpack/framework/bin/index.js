#! /usr/bin/env node --harmony

import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { smartInteractive } from './functions/interactive.js';
import { smartCommander } from  './functions/commander.js';
import { smartTask } from './functions/actions.js';

const executeInteractiveAction = config => {
	smartInteractive
		.help(config)
		.then(answers => {
			// console.log(answers, '//////// ');
			smartTask.execute(config[answers.action], answers);
		})
		// .catch(e => { console.log('error from executeInteractiveAction function: ', e);});
};

const executeCommander = config => {
	smartCommander
		.exec(config)
		.then(commandInfo => {
			commandInfo.isUnknowCommand ? executeInteractiveAction(config) : smartTask.execute(config[commandInfo.action], commandInfo);
	  })
		// .catch(e => { console.log('smartCommander promise error: ', e);});
};

const getTaskFunctionConfig = () => {
	let taskFunctionConfig;
	try { taskFunctionConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', 'bin/config/task-function-config.yml'), 'utf8'));}
	catch (e) { console.log('Read task-function-config.yml file error: ', e); }
	return taskFunctionConfig;
};

executeCommander(getTaskFunctionConfig());
