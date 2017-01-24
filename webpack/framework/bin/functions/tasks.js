import { resolve } from 'path';
import fs from 'fs';
import 'shelljs/global';

import { server } from '../server/index.js';
import  Log from './console.js';

const CWD = process.cwd();
const SmartRootPath = resolve(__dirname, '..', '..');
const TemplatePath = resolve(__dirname, '..', '..', 'bin/templates');

/*

	{ action: 'project',
  argument:
   { project: [ 'home', 'work', 'lit' ],
     host: '0.0.0.0',
     port: 3030 },
  option: 'Normal' }

*/

const initializeProject = (name = '', mode = 'Normal', smartConfig = {}) => {

	let baseDir = `${process.cwd()}/${name}`;
	Log.process(`Creating new '${mode} Project' at ${baseDir}`);

	mkdir('-p', baseDir);
	baseDir += '/';
	if (!fs.existsSync(`${baseDir}.body-smart`)) { touch(`${baseDir}.boy-smart`); }
	// override
	fs.writeFile(`${baseDir}.boy-smart`, `{"installed": false, "baseDir": ${baseDir}, "project-mode": ${mode}}`, err => { if (err) throw err; });

	mode = mode.toLowerCase();
	cp('-f',`${TemplatePath}/${mode}/package.json`,baseDir);
	cp('-f',`${TemplatePath}/${mode}/smart-config.yml`, baseDir);
	cp('-f',`${TemplatePath}/${mode}/template.html`, baseDir);
	cp('-R',`${TemplatePath}/${mode}/src`, baseDir);
	if (smartConfig.clientDir !== 'src') { mv(`${baseDir}src`, '${baseDir}${smartConfig.clientDir}')}
	Log.process('Downloaded installation files.');
	Log.tips(`You can do something to Entry ${name} derectory.`);
};

const checkDependencyPackage = () => {
	if (!fs.existsSync('./node_modules')) {
		Log.process('Installing dependency packages...')
		exec('npm install');
		Log.process('Install completed.');
	}
};

const start = info => {
	checkDependencyPackage();
	server.start(info.argument.port, info.argument.host);
};

const pack = info => {
	console.tips('Developing...');
};

const test = info => {
	console.tips('Developing...');
};

const lint = info => {
	console.tips('Developing...');
};

const project = info => {
	let argument = info.argument;
	initializeProject(argument[info.action][0], argument.option, info.smartConfig);
};

const page = info => {
	console.tips('Developing...');
};

const component = info => {
	console.tips('Developing...');
};

const git = info => {
	console.tips('Developing...');
};

const upgrade = info => {
	Log.process('Upgrading...');
};

export {
	start,
	pack,
	test,
	lint,
	project,
	page,
	component,
	git,
	upgrade
}
