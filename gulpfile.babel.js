// Dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import combinemq from 'gulp-combine-mq';
import webpack from 'webpack-stream';
import gutil from 'gutil';
import plumber from 'gulp-plumber';
import uglifyPlugin from 'uglifyjs-webpack-plugin';
import notify from 'gulp-notify';

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
	.pipe(plumber())
    .pipe(webpack({
		output: { filename: 'bundle.js' },
		quiet: true,
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
						presets: ['es2015','react','stage-0']
					}
				}
			]
		},
		plugins: [new uglifyPlugin()],
		eslint: {
			failOnWarning: false,
			failOnError: false
		}
    }).on('error', onError ))
    .pipe(gulp.dest('./build/js/'));
});


// WATCHERS
gulp.task('watch', () => {
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
	gulp.watch('./dev/js/**/*.js', ['js_bundler']);
});

gulp.task('default', ['sass','js_bundler', 'watch']);