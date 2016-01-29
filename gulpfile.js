var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

var path = {
  HTML: 'src/index.html',
  APP_OUT: 'build.js',
  DEST_BUILD: 'build',
  DEST_BUILD_APP: 'build/js',
  DEST_VENDOR: 'build/vendor',
  VENDOR_OUT: 'vendor.js',	
  APP_ENTRY_POINT: './src/js/App.jsx',
  SASS: 'src/sass/*.scss'
};

var externalDependencies = [
	'react',
	'react-dom',
	'jquery'
];

gulp.task('copyHtml', function(){
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST_BUILD))
		.pipe(notify(function(){
			console.log('index.html is copied');
		}));
});

gulp.task('lint', function(){
	return gulp.src(['src/js/*.jsx','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copyHtml']);
	gulp.watch('src/js/*.jsx', ['lint']);

	//Create browserify watcher that also transforms ES2015 and JSX to ES5
	var watcher = watchify(
		browserify({
		    entries: [path.APP_ENTRY_POINT],
		    debug: false,
		    cache: {}, packageCache: {}, fullPaths: true
		})
		.transform(babelify, {presets: ['es2015', 'react']})
	);

	//Set external dependecies for faster bundling
	watcher.external(externalDependencies);

	return watcher.on('update', function () {
		watcher.bundle()
			.pipe(source(path.APP_OUT))
			.pipe(gulp.dest(path.DEST_BUILD_APP	))
			.pipe(notify(function () {
				console.log('app is bundled');
			}));
	})
    .bundle()
    .pipe(source(path.APP_OUT))
    .pipe(gulp.dest(path.DEST_BUILD_APP));
});

gulp.task('bundleVendors', function(){
	var vendorBundler = browserify({
		debug: true,
		require: externalDependencies
	});

	vendorBundler.bundle()
		.pipe(source(path.VENDOR_OUT))
		.pipe(gulp.dest(path.DEST_VENDOR))
		.pipe(notify(function(){
			console.log('vendors are bundled');
		}));
});

gulp.task('default', ['watch', 'bundleVendors']);