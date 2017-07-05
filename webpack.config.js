const webpack = require('webpack');
const path = require('path');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ['./dev/js/main.js',  './dev/sass/master.scss'],
	watch: true,
	output: {
		filename: 'bundle.js',
    	path: path.resolve(`${__dirname}/build`, 'js')
	},
	resolveLoader: {
		modules: ["node_modules"],
		moduleExtensions: ['-loader']
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'eslint-loader'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel',
						options: {
							presets: ['es2015','react'],
							comments: false
						}
					}
				]
			},
			// {
			// 	test: /\.css$/,
			// 	use: ExtractTextPlugin.extract({
			// 		use: 'css-loader?importLoaders=1&minimize=true',
			// 	}),
			// },
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract(['css-loader?minimize=true', 'sass-loader'])
			}
		]
	},
	plugins: [
		new uglifyPlugin({output: {comments: false}}),
		new ExtractTextPlugin({
			filename: '../css/master.css',
			allChunks: false,
    	})
	]
}