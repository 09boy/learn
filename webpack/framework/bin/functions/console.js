// const colors = [
// 	{"Reset" , "\x1b[0m"}
// 	{"Bright" , "\x1b[1m"}
// 	{"Dim" , "\x1b[2m"}
// 	{"Underscore" , "\x1b[4m"}
// 	{"Blink" , "\x1b[5m"}
// 	{"Reverse" , "\x1b[7m"}
// 	{"Hidden" , "\x1b[8m"}

// 	{"FgBlack" , "\x1b[30m"}
// 	{"FgRed" , "\x1b[31m"}
// 	{"FgGreen" , "\x1b[32m"}
// 	{"FgYellow" , "\x1b[33m"}
// 	{"FgBlue" , "\x1b[34m"}
// 	{"FgMagenta" , "\x1b[35m"}
// 	{"FgCyan" , "\x1b[36m"}
// 	{"FgWhite" , "\x1b[37m"}

// 	{"BgBlack" , "\x1b[40m"}
// 	{"BgRed" , "\x1b[41m"}
// 	{"BgGreen" , "\x1b[42m"}
// 	{"BgYellow" , "\x1b[43m"}
// 	{"BgBlue" , "\x1b[44m"}
// 	{"BgMagenta" , "\x1b[45m"}
// 	{"BgCyan" , "\x1b[46m"}
// 	{"BgWhite" , "\x1b[47m"}
// ];

const RESET = '\x1b[0m';
const COLOR_START = '\x1b[36m';

const commonColorsObj = {
	warn: '\x1b[35m',
	error: '\x1b[31m',
	log: '\x1b[2m',
	tips: '\x1b[36m'
};

const print = (method, ...args) => {
	let color = commonColorsObj[method],
			name = `${method.toUpperCase()} :: `;
	console[method] ? console[method](`\x1b[36m${color}`, name, ...args, RESET) :
										console.log(`\x1b[36m${color}`, name, ...args, RESET);
};

const Log = {
	warn: (...args) => {
		print('warn', ...args);
	},
	error: (...args) => {
		print('error', ...args);
	},
	tips: (...args) => {
		print('tips', ...args);
	},

	log: console.log
};

export default Log;