const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// import { path } from 'path';
// import { webpack } from 'webpack';

const resources = path.resolve(__dirname, 'client');
const static_sources = path.resolve(__dirname, 'static');

module.exports = {
	context: resources,
	devtool: 'inline-source-map',
	watchOptions: {
		ignored: /node_modules/,
	},
	entry: {
		bundle: [
			// 'react-hot-loader/patch',
			// activate HMR for React

			'webpack-hot-middleware/client?reload=true',

			'webpack/hot/only-dev-server',
			// bundle the client for hot reloading
			// only- means to only hot reload for successful updates

			'./index.js'
		]
	},
	output: {
		path: static_sources,
		filename: '[name].js',
		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				use: [
					// 'react-hot-loader',
					'babel-loader',
				],
				exclude: /node_modules/,
				include: resources
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	resolve: {
		// descriptionFiles: ['package.json', 'bower.json'],
		// mainFields: ['main', 'browser'],
		// mainFiles: ['index'],
		extensions: ['.js', '.jsx', '.css', '.sass', '.less', '.json', '.md', '.yml', '.html'],
		modules: [path.resolve(__dirname, 'client'), 'node_modules'],
		alias: {
			components$: path.resolve(__dirname, 'client/components')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body' 
		}),

		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR  updates
	]
}