const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resources = path.resolve(__dirname, 'client');
const static_sources = path.resolve(__dirname, 'static');

const ASSET_PATH = process.env.ASSET_PATH || '/';


module.exports = {
	context: resources,
	devtool: 'eval-source-map',
	watchOptions: {
		ignored: /node_modules/,
	},
	entry: {
		bundle: [
			'react-hot-loader/patch',
			// activate HMR for React

			'webpack-hot-middleware/client?reload=true',

			'webpack/hot/only-dev-server',
			// bundle the client for hot reloading
			// only- means to only hot reload for successful updates
			'./index.js'
		],
		vendor: ['react', 'react-dom']
	},
	output: {
		path: static_sources,
		filename: '[name].js',
		publicPath: ASSET_PATH
		// necessary for HMR to know where to load the hot update chunks
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				use: [
					'babel-loader',
				],
				exclude: /node_modules/,
				include: resources
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: ExtractTextPlugin.extract({
							loader: 'css-loader?sourceMap'
						})
					}
				],
				exclude: /node_modules/,
				include: resources
			},

			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: ExtractTextPlugin.extract({
							loader: ['css-loader?sourceMap', 'sass-loader?sourceMap']
						})
					}
				],
				exclude: /node_modules/,
				include: resources
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss', '.less', '.json', '.md', '.yml', '.html'],
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

		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
			disable: false
		}),

		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			// Specify the common bundle's name
		}),

		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR  updates

		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': ASSET_PATH  // JSON.stringfy()
		}),
		// This makes it possible for us to safely use env vars on our code
	]
};
