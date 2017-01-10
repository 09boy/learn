const path = require('path');
const webpack = require('webpack');

console.log('fuckyou :: ', path.resolve(__dirname, 'dist'))
module.exports = {
	entry: {
		bundle: [
			'react-hot-loader',
			// activate HMR for React,

			'webpack-hot-middleware/client?reload=true',

			// 'webpack-dev-server/client?http://localhost:3000',
			// Include the client code (note the host/port setting!)

			'webpack/hot/only-dev-server',
			// Hot reload only when compiled successfully

			path.resolve(__dirname, 'app/index.js')
		]
	}
	,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	// resolve: {
	// 	modules: [
	// 		path.resolve(__dirname, 'app')
	// 	],
	// 	extensions: ['','js', 'jsx', 'scss']
	// },
	devtool: 'cheap-eval-source-map',
	// devServer: {
	// 	contentBase: path.resolve(__dirname, '/app'),
	// 	compress: true,
	// 	port: 3000,
	// 	watchOptions: {
	// 		poll:true
	// 	}
	// },
	module: {
		rules: [
			{
				test: '/\.jsx$/',
				use: [
					'babel-loader',
				],
				include: [
					path.resolve(__dirname, 'app/')
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?modules',
					'postcss-loader',
				],
			},
		],
	},
	plugins: [

    new webpack.HotModuleReplacementPlugin(),
    // enble HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoErrorsPlugin()
	]
}