#! /usr/bin/env node --harmony

const YAML = require('js-yaml');
const FS = require('fs');

console.log(__dirname)

try {
	const DOC = YAML.safeLoad(FS.readFileSync( __dirname + '/config.yml', 'utf8'));
	console.log(DOC);
} catch (e) {
	console.log(e);
}

console.log('boy-smart')