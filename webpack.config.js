const path = require('path'),
	environments = require('gulp-environments');

const env = environments.current()['$name'];

const config = {
	mode: env,
	entry: {
		all: path.resolve(__dirname, './src/js/index.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './public/js'),
		publicPath: '/public/js'
	},
	devtool: env !== 'production' ? 'eval-source-map' : false,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};

module.exports = config;