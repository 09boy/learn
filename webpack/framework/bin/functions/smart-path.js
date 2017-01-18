import { resolve } from 'path';

const SMART_ROOT_PATH = resolve(__dirname, '..', '..');
const ROOT_PATH = process.cwd();

// console.log('Root Path', ROOT_PATH);
// console.log('work root path', ROOT_PATH);

export {
	SMART_ROOT_PATH,
	ROOT_PATH,
}
