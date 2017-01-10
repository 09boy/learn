const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../src/exercise/code-splitting/webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	lazy: false,
	historyApifallback: true,
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	filename: webpackConfig.output.filename,
	noInfo: true,
	stats: {
		colors: true
	},
	watchOptions: {
		poll: true
	}
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
	res.set('Content-Type', 'text/html');
	res.sendFile(path.resolve(__dirname, '../src/exercise/code-splitting/index.html'));
});
// app.use('*', function(req, res, next) {
// 	var filename = path.resolve(__dirname, '../src/exercise/code-splitting/index.html');
// 	compiler.outputFileSystem.readFile(filename, function(err, result) {
// 		if (err) {
// 			return next(err);
// 		}

// 		res.set('Content-Type', 'text/html');
// 		res.send(result);
// 		res.end();
// 	})
// });
app.listen('3000', function() {
	console.log('Listening on port 3000');
});
