var gulp         = require('gulp'),
 		concat       = require('gulp-concat'),
 		sourcemaps   = require('gulp-sourcemaps'),
		ngAnnotate   = require('gulp-ng-annotate'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concatCss    = require('gulp-concat-css'),
		uglify       = require('gulp-uglifyjs'),
		imagemin     = require('gulp-imagemin'),
		order        = require('gulp-order');


gulp.task('browser-sync', [
							'styles',
							'vendorCss',
							'compressImg',
							'js'
							], function() {
		browserSync.init({
				server: {
					baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	gulp.src('app/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss(''))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('vendorCss', function () {
  return gulp.src('app/libs/**/*.css')
    .pipe(concatCss("vendor.css"))   
    .pipe(minifycss('')) 
    .pipe(rename("vendor.min.css"))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('compressImg', function() {
  return gulp.src('app/img/*')
  .pipe(imagemin(''))
  .pipe(gulp.dest('prod/img/'));
});

// gulp.task('controllers', function() {
//   return gulp.src('app/components/controller/*.js')
//     .pipe(concat('controllers.min.js'))
//     .pipe(uglify(''))
//     .pipe(gulp.dest('prod/js/'));
// });

gulp.task('js', function () {
  gulp.src(['app/libs/**/*.js'])
	  .pipe(order([
	    "app/libs/angular/*.js",
	    "app/libs/external-angular/*.js",
	    "app/libs/external-library/*.js"    
	  ]))
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('prod/js/'))
});

// gulp.task('fontsdist', function() {
//   	return gulp.src('app/fonts/*/**')   
//     .pipe(gulp.dest('prod/fonts'));
// });
	//gulp.watch('app/**/*.js', ['controllers']).on('change', browserSync.reload);	

gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', ['styles']).on('change', browserSync.reload);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);	
});

gulp.task('default', ['browser-sync', 'watch']);