import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { server } from '../server/index.js';

const CWD = process.cwd();
const SmartRootPath = resolve(__dirname, '..', '..');
const TemplatePath = resolve(__dirname, '..', '..', 'bin/templates');

let smartConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

const getTaskFunctionConfig = () => {
	let applicationConfig;
	try { applicationConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', 'config/smart-config.yml'), 'utf8'));}
	catch (e) { console.log('Read smart-config.yml file error: ', e); }

	console.log(applicationConfig);
	return applicationConfig;
};

// getTaskFunctionConfig()

// in directory of framework and project child
const notExcuteAction = () => {

}

console.log(__filename);
const checkWorkDirectory = () => {

	if (CWD.includes('/framework') || CWD.includes(`/${smartConfig.clientDir}`) /* || !(fs.existsSync(CWD + '/package.json') && fs.existsSync(CWD + `/${smartConfig.clientDir}/`))*/) {
		console.log('not excute commander lines, because you not at root project directory.');
		return
	}

	
	if (!fs.existsSync(CWD + '/package.json')) {
		console.log('First, you should create project which you do.');
		cp('-f',`${TemplatePath}/normal/package.json`,'./');
		cp('-f',`${TemplatePath}/normal/smart-config.yml`,'./');
		cp('-R',`${TemplatePath}/normal/src`,'./');
		return
	}

	// if (fs.existsSync(ROOT_PATH + '/smart-config.js')) {
	// 	console.log('initializated work derectory');
	// } else {
	// 	console.log('not initial work derectory');
	// }
};



const initialization = () => {

};

const smartTask = {
	execute: (config, info) => {
		//console.log('execute task', info)
		server.start();
		checkWorkDirectory();
	}
};

export { smartTask };
