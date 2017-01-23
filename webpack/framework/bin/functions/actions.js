import { resolve } from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import * as Task from './tasks.js';
import  Log from './console.js';

const CWD = process.cwd();

let smartConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

// const installInfoJSON = {installed: false, baseDir: null};

/**
 * Checking before executing task:
 * 
 * Step 1.  Whether the file of package.json and .boy-smart exist in the current directory.
 *      1.1 Existing      ->  Go Step 4
 *      1.2 Not Existing  ->  Go Step 2
 *
 * Step 2.  Nothing 'smart' Project or Not at root directory of 'smart' Project.
 *      2.1 To find files of Step 1 at the parent directory until more than 9 levels to end; get warning and stop task of executing if both files have existed in the parent directory where less than 10 levels.
 *			2.2 Not finding up  ->  Go Step 3
 * 
 * Step 3.  Creating new 'smart' Project  in the current directory and installing dependency packages.
 * 
 * Step 4.  Executing task
 */

const isExistInstallFiles = path => {
	return fs.existsSync(path + 'package.json') && fs.existsSync(path + '.boy-smart');
};

const isFrameworkDirectory = () => {
	if (fs.existsSync('.framework-env') || CWD.includes('/framework')) {
			Log.error('In addition to upgrade you cannot do anything at the place where is framework directory.');
			return true;
	}
	return false;
}

const isInProjectRootDir = () => {
	let condition =  isExistInstallFiles(process.cwd() + '/');
	return new Promise((resolve, reject) => {
		condition ? resolve() : reject();
	})
};

const isRejectExecAction = () => {
	let condition = CWD.includes('/framework');
	if (condition) Log.error('Reject execute command lines, because you not at root directory of project .');
	return condition
};

const toUpFindFile = (condition, level = 10) => {
	let	result = false,
			s_date = new Date().getTime();

	Log.tips('Checking whether project is exist.');
	let dirPath = '';

	while(--level) {
		dirPath += '../'
		if (condition(dirPath)) {
			result = true;
			break;
		}
	}

	let e_date = new Date().getTime(),
			tookMs = e_date - s_date;
	Log.tips(`Took ${tookMs} seconds.`);
	if (result) { Log.warn(`You has created Project in ${resolve(dirPath)}, please back to Project Root Directory executing command line.`); }
	
	return new Promise((resolve, reject) => {
		if (result) { reject('existed'); }
		else {
			Log.warn('You can use "smart || smart project <name> [mode]" command line to create new Project.');
			resolve('new-project');
		}
	});
};

const checkWorkDirectory = () => {
	return new Promise((resolve, reject) => {
		if (!isFrameworkDirectory()) {
			isInProjectRootDir().then(resolve).catch(() => toUpFindFile(isExistInstallFiles)).then(msg => { resolve(msg); })
		}
	})
	
};

const smartAction = {
	execute: (config, info) => {
		if (info.action === 'upgrade') { Task[info.action](); return; }

		checkWorkDirectory().then(msg => {
			if (!msg && info.action === 'project') { Log.error('Do not create new Project at the place where has had "smart" project.'); return; } 
			else if (msg === 'new-project' && info.action !== 'project') { return; }

			info.argument.host = info.argument.host || smartConfig.host;
			info.argument.port = info.argument.port || smartConfig.port;
			console.log('exec task....');
			Task[info.action]({...info, smartConfig});
		})
	}
};

export { smartAction };
