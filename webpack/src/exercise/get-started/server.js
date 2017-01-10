const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	inline: true,

	noInfo: true,
	// display no info to console (only warnings and errors)

	quiet: false,
	// display nothing to the console

	// lazy: false,
	// switch into lazy mode
	// that means no watching, but recompilation on every request

	// filename: webpackConfig.output.filename,

	watchOptions: {
		aggregateTimeout: 3000,
		poll: true
	},
	// watch options (only lazy: false)

	publicPath: webpackConfig.output.publicPath, 
	// public path to bind the middleeare to use the same as in webpack
	// Same as 'output.publicPath' in most cases.

	// index: path.resolve(__dirname + '/index.html'),
	// the index path for web server

	heasers: {'X-Custom-Header': 'yes'},
	// custom headers

	stats: {
		colors: true
	},
	// options for formating the statistics

	reporter: null,
	// Provide a custom reporter to change the way how logs are show.

	serverSideRender: false,
	// Turn off the server-side rendering mode,see Server-Side Rendering part for more info.
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
	// res.set({
	// 	'Content-Type': 'text/html',
	// });
	// res.send('<p>some html</p>')
	res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});