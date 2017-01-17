import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { SMART_ROOT_PATH, ROOT_PATH } from './smart-path.js';
import { server } from '../server/index.js';



const getTaskFunctionConfig = () => {
	let applicationConfig;
	try { applicationConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', 'config/smart-config.yml'), 'utf8'));}
	catch (e) { console.log('Read smart-config.yml file error: ', e); }

	console.log(applicationConfig);
	return applicationConfig;
};

// getTaskFunctionConfig()


const checkWorkDirectory = () => {
	if (!fs.existsSync(ROOT_PATH + '/package.json')) {
		console.log('First, you should create project which you do.');
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
		// server.start();
		checkWorkDirectory();
	}
};

export { smartTask };
