import { resolve } from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackConfigFun } from '../webpack/config.js';

const CWD = process.cwd() + '/';

const app = express();

app.get('*', (req, rep) => {
	rep.set('Content-Type', 'text/html');
	rep.sendFile(`${CWD}template.html`);
});

const server = {
	start: (port, host) => {
		app.listen(port, () => {
			console.log('start server... port is ' + port);
		});
	}
};

export { server };
