// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const combinemq = require('gulp-combine-mq');
const webpack = require('webpack-stream');
const gutil = require('gutil');
const plumber = require('gulp-plumber');

// Local Variables
const internals = {};

// Configuration
internals.supportedBrowsers = [ 'last 2 versions' ];

gulp.task('sass', () => {
	return gulp.src('./dev/sass/**/master.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(combinemq())
		.pipe(cssnano({
            autoprefixer: { browsers: internals.supportedBrowsers, add: true }
        }))
        .pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('js_bundler', () => {
	return gulp.src('./dev/js/main.js')
	.pipe(plumber())
    .pipe(webpack({
		output: { filename: 'bundle.js' },
		module: {
			preLoaders: [
				// Javascript
				{ test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
			],
			loaders: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015']
					}
				}
			]
		},
		eslint: {
			failOnWarning: false,
			failOnError: false
		}
    }))
    .pipe(gulp.dest('./build/js/'));
});


// WATCHERS
gulp.task('watch', () => {
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
	gulp.watch('./dev/js/**/*.js', ['js_bundler']);
});

gulp.task('default', ['sass','js_bundler', 'watch']);