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

const installInfoJSON = {installed: false, baseDir: null};

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
	return fs.existsSync(path + 'package.json') && fs.existsSync(dirPath + '.boy-smart');
};

const isInProjectRootDir = () => {
	let condition =  isExistInstallFiles('./');//fs.existsSync('./package.json') && fs.existsSync('./.boy-smart')
	Log.tip('Do you in project root directory: ', condition);
	return new Promise((resolve, reject) => {
			condition ? resolve() : reject()
	})
};

const isRejectExecAction = () => {

	// CWD.includes(`/${smartConfig.clientDir}`)
	let condition = CWD.includes('/framework');
	if (condition) Log.error('Reject execute command lines, because you not at root directory of project .');
	return condition
};

const isProjectInitialization= () => {
	let conditaion = fs.existsSync(CWD + '/package.json');
	if (!conditaion) Log.tip('Initialize the project...');
	return conditaion
};

const initializeProject = () => {
	// if (!fs.existsSync('./.body-smart')) touch('./.boy-smart');

	// fs.writeFile('./.boy-smart', '{install: true}', err => {
	// 	if (err) throw err;

	// 	console.log('It is saved')
	// })

	// fs.readFile('./.boy-smart', 'utf8', (err, data) => {
	// 	if (err) throw err;

	// 	console.log(JSON.parse(data));
	// })
	// cp('-f',`${TemplatePath}/normal/package.json`,'./');
	// cp('-f',`${TemplatePath}/normal/smart-config.yml`,'./');
	// cp('-R',`${TemplatePath}/normal/src`,'./');
	// if (smartConfig.clientDir !== 'src') { mv('./src', './${smartConfig.clientDir}')}
};

// const findFile = () => {
// 	let level = 10;
// 	// console.log(__dirname, CWD.split('/').pop());
// 	Log.tip('loop dirs to find intall-files that are package.json and .boy-smart');
// 	let s_date = new Date();
// 	s_date = s_date.getTime();
// 	let josnFil, smartFile, result = false, dirPath = '';
// 	while (--level) {
// 		dirPath += '../'
// 		josnFil = fs.existsSync(dirPath + 'package.json')
// 		smartFile = fs.existsSync(dirPath + '.boy-smart')
// 		console.log(level);
// 		if (josnFil && smartFile) {
// 			result = true
// 			break 
// 		}
// 	}

// 	let e_date = new Date();
// 	console.log('use ms ::: ', (e_date.getTime() - s_date));
// 	console.log('find file result : ', result);
// };


const findFile = (condition) => {
	let level = 10;
	let result = false;
	let s_date = new Date().getTime();

	let dirPath = ''

	while(--level) {
		dirPath += '../'
		if (condition(dirPath)) {
			result = true;
			console.log('find up');
			break;
		}
	}

	let e_date = new Date().getTime();
	let useMs = s_date - e_date;

	Log.tip('FindFile Result ::', result , ' ====  Use ms : ', useMs);
}

const toUpFindFile = path => {
	return false
} 

const checkWorkDirectory = () => {

	isInProjectRootDir()
	.catch(findFile(isExistInstallFiles))


	// findFile();
	// if (isRejectExecAction()) { return }

	// if (!isProjectInitialization()) { initializeProject(); }

	// if (fs.existsSync(ROOT_PATH + '/smart-config.js')) {
	// 	console.log('initializated work derectory');
	// } else {
	// 	console.log('not initial work derectory');
	// }

	console.log('exec task...')
};

const initialization = () => {

};

const smartTask = {
	execute: (config, info) => {
		info.argument.host = info.argument.host || smartConfig.host
		info.argument.port = info.argument.port || smartConfig.port
		console.log('execute task', info)
		// server.start();
		checkWorkDirectory();
	}
};

export { smartTask };
