#! /usr/bin/env node --harmony

import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { smartInteractive } from './functions/interactive.js';
import { smartCommander } from  './functions/commander.js';


if (__dirname.split('/').pop() === '_bin') {
	cp('-R', resolve(__dirname, '..', 'bin/config'), './_bin');
}

try {
	const DOC = yaml.safeLoad(fs.readFileSync( __dirname + '/config/task-function-config.yml', 'utf8'));
	smartCommander.start(DOC).then(commandObj => {
		console.log('...promise value is ', commandObj);
		if (commandObj.isUnknowCommand) {
			smartInteractive.help(DOC);
		} else {

		}
	}).catch(e => {
		console.log('smartCommander promise error: ', e);
	});

} catch (e) {
	console.log('Read ymal file error: ', e);
}

console.log('boy-smart', __dirname.split('/').pop())