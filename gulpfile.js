var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	argv = require('yargs').argv;

var o = !!(argv.o) || !!(argv.open);

var index = {
	src: "index.html",
	dest: "."};
var js = {
	json: ['./assets/**/*.{js,json}'],
	order: ['./assets/**/_*.js', './assets/**/!(_)*.js'],
	src: "./assets/**/*.js",
	dest: "."};


/***** COMPOSITE TASKS *****/
gulp.task('serve', ['browse','watch']);
gulp.task('watch', function(){
	gulp.watch(index.src, ['index']);
	gulp.watch(js.json, ['script']);
});

/***** SIMPLEX TASKS *****/

gulp.task('browse', function(){
	browserSync.init({
		server: '.',
		open: (o ? 'external' : false),
		notify: false
	});
});
gulp.task('script', function(){
	return gulp.src(js.order)
		.pipe($.concat('main.js'))
		//.pipe($.uglify())
		.pipe(gulp.dest(js.dest))
		.pipe(browserSync.stream());
});
gulp.task('index', function(){
	return gulp.src(index.src)
		.pipe(gulp.dest(index.dest))
		.pipe(browserSync.stream());
});
