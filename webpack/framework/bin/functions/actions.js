import { resolve } from 'path'
import yaml from 'js-yaml';
import fs from 'fs';
import 'shelljs/global';

import { server } from '../server/index.js';
import  Log from './console.js';

const CWD = process.cwd();
const SmartRootPath = resolve(__dirname, '..', '..');
const TemplatePath = resolve(__dirname, '..', '..', 'bin/templates');

let smartConfig = yaml.safeLoad(fs.readFileSync(resolve(__dirname, '..', '..', 'bin/config/smart-config.yml')), 'utf8');

// const installInfoJSON = {installed: false, baseDir: null};

// const getDirectories = srcpath => {
//   return fs.readdirSync(srcpath).filter(function(file) {
//     return fs.statSync(resolve(srcpath, file)).isDirectory();
//   });
// }

/**
 * 执行任务前检查
 * 
 * 1. 先读取当前目录是否有 package.json & .boy-smart
 *   1.1 存在  --> step 4
 *   1.2 不存在 --> step 2
 * 2. 未建立项目 或者 不在项目根目录
 *   2.1 最多往上查找10级目录，是否有满足条件 step 1;  note: 不会向下查找
 *   2.1.1 存在 -->  拒绝执行任务 并发出警告提示
 *   2.1.2 不存在 --> step 3
 * 3. 建立项目
 * 4. 已经初始化并且在项目根目录可执行任务
 */

const isExistInstallFiles = path => {
	return fs.existsSync(path + 'package.json') && fs.existsSync(path + '.boy-smart');
};

const isFrameworkDirectory = () => {
	if (fs.existsSync('.framework-env')) {
			Log.error('You can not initial project at the place where is framework directory.');
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

// const isProjectInitialization= () => {
// 	let conditaion = fs.existsSync(CWD + '/package.json');
// 	if (!conditaion) Log.tips('Initialize the project...');
// 	return conditaion
// };

const initializeProject = () => {
	let baseDir = process.cwd() + '/';
	Log.tips(`Create new Project at ${baseDir}`);

	/*if (!fs.existsSync('./.body-smart')) { touch(`${baseDir}.boy-smart`); }
	// override
	fs.writeFile('./.boy-smart', `{"installed": false, "baseDir": ${baseDir}}`, err => {
		if (err) throw err;
		console.log('It is saved')
	});

	cp('-f',`${TemplatePath}/normal/package.json`,baseDir);
	cp('-f',`${TemplatePath}/normal/smart-config.yml`, baseDir);
	cp('-R',`${TemplatePath}/normal/src`, baseDir);
	if (smartConfig.clientDir !== 'src') { mv(`${baseDir}src`, '${baseDir}${smartConfig.clientDir}')}

	// installing package
	exec('npm install');*/
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

	let e_date = new Date().getTime();
	let tookMs = e_date - s_date;
	Log.tips(`Took ${tookMs} seconds.`);
	if (result) {
		Log.warn(`You has created Project in ${resolve(dirPath)}, please back to Project Root Directory executing command line.`);
		// cd(dirPath)
		// console.log(process.cwd());
	}
	
	return new Promise((resolve, reject) => {
		if (result) { resolve('sucess'); }
		else {
			Log.warn('You can use "smart || smart project <name> [mode]" command line to create new Project.');
			reject('new project');
		}
	});
};

const checkWorkDirectory = () => {

	return new Promise((resolve, reject) => {
		if (!isFrameworkDirectory()) {
			isInProjectRootDir().then(resolve).catch(() => toUpFindFile(isExistInstallFiles)).catch(msg => { resolve(msg); })
		}
	})
	
	// return Promise.all([isFrameworkDirectory(), isInProjectRootDir().catch(checkOutInstallFiles)]).then(values => {
	// 	Promise.resolve('check success')
	// 	console.log('all::', values);
	// })

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
		// console.log(info);
		// checkWorkDirectory().then(msg => {
		// 	console.log('exec task....', msg);
		// 	if (msg) {
		// 		initializeProject();
		// 	}

		// 	info.argument.host = info.argument.host || smartConfig.host
		// 	info.argument.port = info.argument.port || smartConfig.port
		// 	// console.log('execute task', info)
		// 	// server.start();
		// })
	}
};

export { smartTask };
