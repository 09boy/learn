import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import './smart-path.js';

const getTaskFunctionConfig = () => {
	let applicationConfig;
	try { applicationConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', 'config/smart-config.yml'), 'utf8'));}
	catch (e) { console.log('Read smart-config.yml file error: ', e); }

	console.log(applicationConfig);
	return applicationConfig;
};

// getTaskFunctionConfig()

const checkWorkDirectory = () => {

};



const initialization = () => {

};

const smartTask = {
	execute: (config, info) => {
		console.log('execute task', info)
	}
};

export { smartTask };
