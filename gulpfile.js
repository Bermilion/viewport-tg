const gulp = require('gulp'),
	environments = require('gulp-environments'),
	browserSync = require('browser-sync').create(),
	webpackStream = require('webpack-stream'),
	webpackConfig = require('./webpack.config.js'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	cleanCSS = require('gulp-clean-css');

const src = {
	sass: {
		input: ['./src/sass/style.scss'],
		output: './public/css',
		watch: './src/sass/**/*.scss'
	},
	js: {
		input: ['./src/js/**/*.js'],
		output: './public/js',
		watch: './src/js/**/*.js'
	},
	serve: {
		dir: './public',
		index: 'serve.html',
		watch: './public/*.html'
	}
};

const development = environments.development,
	production = environments.production;

function styles() {
	return gulp.src(src.sass.input)
		.pipe(development(sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 0.1%'],
			cascade: false
		}))
		.pipe(production(
			cleanCSS({
				level: 2
			})
		))
		.pipe(development(sourcemaps.write()))
		.pipe(gulp.dest(src.sass.output))
		.pipe(development(browserSync.stream()));
}

function serverSync() {
	browserSync.init({
		proxy: 'http://localhost:8000',
		serveStatic: ['./public']
	});

	gulp.watch(src.sass.watch, styles);
	gulp.watch(src.js.watch, scripts);
	gulp.watch(src.serve.watch).on('change', browserSync.reload);
}

function watch() {
	gulp.watch(src.sass.watch, styles);
	gulp.watch(src.js.watch, scripts);
	gulp.watch('public/*.html').on('change', browserSync.reload);
}

function scripts() {
	return gulp.src(src.js.input)
		.pipe(webpackStream(webpackConfig))
		.pipe(development(browserSync.stream()))
		.pipe(gulp.dest(src.js.output))
}

gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('dev', gulp.series('build', serverSync));
gulp.task('watch', gulp.series('build', watch));