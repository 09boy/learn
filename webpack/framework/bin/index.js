#! /usr/bin/env node --harmony

import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { smartInteractive } from './functions/interactive.js';
import { smartCommander } from  './functions/commander.js';
import { smartAction } from './functions/actions.js';

const executeInteractiveAction = config => {
	smartInteractive
		.help(config)
		.then(answers => {
			smartAction.execute(config[answers.action], answers);
		});
};

const executeCommander = config => {
	smartCommander
		.exec(config)
		.then(commandInfo => {
			commandInfo.isUnknowCommand ? executeInteractiveAction(config) : smartAction.execute(config[commandInfo.action], commandInfo);
	  });
};

const getTaskFunctionConfig = () => {
	let taskFunctionConfig;
	try { taskFunctionConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', 'bin/config/task-function-config.yml'), 'utf8'));}
	catch (e) { console.log('Read task-function-config.yml file error: ', e); }
	return taskFunctionConfig;
};

executeCommander(getTaskFunctionConfig());
