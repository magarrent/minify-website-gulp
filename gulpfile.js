const gulp = require('gulp');
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var uglyfly = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

// Minify CSS

gulp.task('minify-css', function() {
  return gulp.src('css/**') // * All files === ** All files recursive
    .pipe(cleanCSS({                    // Minify CSS
        compatibility: 'ie8',
        processImport: true,
        inline: ['none']
    }))
    .pipe(rename({ suffix: '.min' })) // Rename file with .min
    .pipe(concat('styles.min.css')) // All css files will concat in styles.min.css
    .pipe(gulp.dest('dist/css')); // Destination, final result
});

// END Minify CSS

// Minify Images => Destination dist/...

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

// END Minify Images

// Minify JS

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(uglyfly()) // Minify JS
    .pipe(rename({ suffix: '.min' })) // Rename files with the min
    .pipe(gulp.dest('dist')) // Destination, final results
});

// END Minify JS
