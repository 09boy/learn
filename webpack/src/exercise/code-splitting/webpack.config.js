const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const CWD = process.cwd();
const CD = path.resolve(__dirname);

module.exports = {
	context: CWD,
	devtool: 'cheap-eval-source-map',
	entry: {
		bundle: [
			// path.resolve(CWD,'node_modules','react-hot-loader') + '/patch',
    		// activate HMR for React

			// 'webpack-hot-middlerware?client?http://localhost:3000',
			path.resolve(CWD,'node_modules','webpack-hot-middleware') + '/client?reload=true',
			'webpack/hot/only-dev-server',
			CD + '/index.js',
		]
		// vendor: 'moment'
	},
	output: {
		filename: '[name].js',
		path: CD + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [path.resolve(CWD,'node_modules', 'babel-preset-es2015')]
						}
						
					}
				],
				// include: [
				// 	CD + 'app'
				// ],
				exclude: /node_modules/
			}
		]
	},
	resole: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: ['vendor', 'manifest'], // Specify the common bundle's name.
		// })
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates.

		new HtmlPlugin({
			template: CD + '/index.html',
			inject: 'body'
		}),
	]
}