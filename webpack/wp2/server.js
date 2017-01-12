const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	stats: {
		colors: true,
	},
	historyApiFallback: true,
	contentBase: path.resolve(__dirname, 'client'),
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
	res.set('Content-Type', 'text/html');
	res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

app.listen(3000, function(){
	console.log('listen: localhost:3000');
})