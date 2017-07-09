const webpack = require('webpack');
const path = require('path');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('yargs').argv

const config = {
	devtool: 'source-map',
	entry: ['./dev/js/main.js',  './dev/sass/master.scss'],
	watch: true,
	output: {
		filename: 'bundle.js',
    	path: path.resolve(`${__dirname}/build`, 'js')
	},
	resolveLoader: {
		modules: ["node_modules"]
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
						loader: 'babel-loader',
						options: {
							presets: ['es2015','react','stage-3'],
							comments: false
						}
					}
				]
			},
			// {
			// 	test: /\.css$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: ExtractTextPlugin.extract({
			// 		use: 'css-loader?importLoaders=1&minimize=true',
			// 	}),
			// },
			{
				test: /\.(sass|scss)$/,
				exclude: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract(['css-loader?minimize=true', 'sass-loader'])
			}
		]
	},
	plugins: [
		// new uglifyPlugin({
		// 	mangle: false,
		// 	compress: {
		// 		warnings: false, // Suppress uglification warnings
		// 		pure_getters: true,
		// 		unsafe: true,
		// 		unsafe_comps: true,
		// 		screw_ie8: true
		// 	},
		// 	sourceMap: false,
		// 	output: {
		// 		comments: false
		// 	},
		// 	compressor: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.DefinePlugin({
      		'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new ExtractTextPlugin({
			filename: '../css/master.css',
			allChunks: false,
    	})
	]
};


module.exports = config;