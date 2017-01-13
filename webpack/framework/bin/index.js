#! /usr/bin/env node --harmony

import yaml from 'js-yaml';
import fs from 'fs';

import { smartInteractive } from './interactive.js';
import { smartCommander } from './commander.js';

try {
	const DOC = yaml.safeLoad(fs.readFileSync( __dirname + '/config/task-function-name-config.yml', 'utf8'));
	console.log(DOC);
	smartInteractive.start(DOC);
	smartCommander.start(DOC);

} catch (e) {
	console.log(e);
}

console.log('boy-smart')