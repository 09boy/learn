import { resolve } from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackConfigFun } from '../webpack/config.js';




const app = express();

app.get('*', (req, rep) => {
	rep.set('Content-Type', 'text/html');
	rep.sendFile(resolve(__dirname, '..', '..', 'bin/template.html'));
});

const server = {
	start: () => {
		// app.listen('3000', () => {
		// 	console.log('start server...');
		// });
	}
};

export { server };
