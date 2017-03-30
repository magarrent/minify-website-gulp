const gulp = require('gulp');
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var uglyfly = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
 
gulp.task('minify-css', function() {
  return gulp.src('css/**')
    .pipe(cleanCSS({
        compatibility: 'ie8',
        processImport: true,
        inline: ['none']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('uploads', () =>
    gulp.src('uploads/**')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/uploads'))
);

gulp.task('imagecache', () =>
    gulp.src('imagecache/**')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/imagecache'))
);

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(uglyfly())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
});
