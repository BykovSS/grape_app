const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
	const commonConfig = {
		entry: {app: [
			'core-js/stable',
			'regenerator-runtime/runtime',
			'es6-promise',
			'./src/index.tsx'
		]},
		output: {
			path: path.resolve(__dirname, './docs'),
			filename: '[name].js',
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				inject: false,
				template: require('html-webpack-template'),
				appMountId: 'app',
				lang: 'ru-RU',
				links: [
					{
						href: 'img/favicon.ico',
						rel: 'shortcut icon',
						sizes: '16x16',
						type: 'image/x-icon'
					}
				],

				scripts: [
					'app.js'
				],
				title: 'Grape App'
			}),
			new CopyWebpackPlugin({
				patterns: [
					{from: path.join(__dirname, './src/assets/favicon'), to: 'img'},
					{from: path.join(__dirname, './src/assets/img'), to: 'img'}
				]
			}),
			new MiniCssExtractPlugin()
		],
		module: {
			rules: [
				{
					test: /\.(js|ts|tsx)$/,
					exclude: /(node_modules)/,
					loader: 'eslint-loader',
					enforce: 'pre',
					options: {
						fix: true
					}
				},
				{
					test: /\.(ts|tsx)$/,
					exclude: /(node_modules)/,
					loader: 'ts-loader'
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/i,
					exclude: /(node_modules)/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								esModule: true
							}
						},
						'css-loader',
						'postcss-loader',
						'less-loader'
					]
				},
				{
					test: /\.(gif|jpeg|jpg|png|ico)(\?[0-9]+)?$/,
					type: 'asset/resource',
					generator: {
						filename: 'img/[name][ext]'
					}
				},
				{
					test: /\.(eot|svg|ttf|woff|otf)(\?[0-9]+)?$/,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name][ext]'
					}
				},
			]
		},
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom'
			},
			extensions: ['.ts', '.tsx', '.js']
		},
		externals: {},
		target: ['web', 'es5'],
		optimization: {
			splitChunks: {
				minSize: 0,
				minChunks: 1,
				name: 'vendors'
			}
		},
		devServer: {
			client: {
				logging: 'info',
				progress: true
			},
			compress: false,
			historyApiFallback: true,
			host: 'localhost',
			hot: true,
			open: true,
			port: 8080,
			static: {
				directory: path.resolve(__dirname, './docs'),
				publicPath: '/',
				watch: true
			}
		}
	};

	if (argv.mode === 'production') {
		return merge(commonConfig, {
			mode: 'production',
			plugins: [
				new webpack.EnvironmentPlugin({__DEVELOPMENT__: false})
			]
		})
	} else {
		return merge(commonConfig, {
			mode: 'development',
			plugins: [
				new webpack.EnvironmentPlugin({__DEVELOPMENT__: true})
			]
		})
	}
};