// Dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import combinemq from 'gulp-combine-mq';
import webpack_stream from 'webpack-stream';
import gutil from 'gutil';
import plumber from 'gulp-plumber';
import uglifyPlugin from 'uglifyjs-webpack-plugin';
import notify from 'gulp-notify';
import webpack from 'webpack';

// Local Variables
const internals = {};

// Configuration
internals.supportedBrowsers = [ 'last 2 versions' ];

// Error Handler
internals.onError = function(error) {
    notify({
         title: 'Asset compiling error',
         message: 'Check the console for details.'
     }).write(error.message);

	console.log(error.message);
	this.emit('end');
};

// Destructuring internals
const { onError, supportedBrowsers } = internals;

gulp.task('sass', () => {
	return gulp.src('./dev/sass/**/master.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(combinemq())
		.pipe(cssnano({
            autoprefixer: { browsers: supportedBrowsers, add: true }
        }))
        .pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('js_bundler', () => {
	return gulp.src('./dev/js/main.js')
	.pipe(plumber({
		errorHandler: () => {
			console.log('error');
		}
	}))
    .pipe(webpack_stream({
		watch: true,
		cache: true,
		output: { filename: 'bundle.js' },
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					use:[{
							loader: 'babel-loader',
							options: {
								presets: ['es2015','react','stage-0'],
								comments: false
							}
						},
						{
							loader: 'eslint-loader'
						}]
				}
			]
		},
		plugins: [new uglifyPlugin({output: {comments: false}})]
    }, webpack))
    .pipe(gulp.dest('./build/js/'))
    .pipe(notify('Bundler completed'));
});

// WATCHERS
gulp.task('watch', () => {
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
	// gulp.watch('./dev/js/**/*.js', ['js_bundler']);
});

gulp.task('default', ['sass','js_bundler', 'watch']);