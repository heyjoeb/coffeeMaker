var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    cleanCSS = require('gulp-clean-css')


// Compile sass into CSS & auto-inject into browsers
gulp.task('scss', function(done) {
    gulp.src(['src/scss/*.scss'])
        .pipe(sass({
            outputStyle : "compressed"
        }))
        .pipe(autoprefixer({
            browsers : ["last 3 versions"]
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
    done();
})

// minify css
gulp.task('minify-css',  function(done) {
    gulp.src('src/css/*.css')
    .pipe(cleanCSS({
      format: 'beautify'
    }))
    .pipe(gulp.dest('src/css'))
    done();
});

// minify images
gulp.task("images", function (done) {
    gulp.src("src/assets/*")
        .pipe(imagemin([
            pngquant({quality: [0.5, 0.5]}),
            mozjpeg({quality: 50})
        ]))
        .pipe(gulp.dest("src/assets"))
    done();
})

// Concatenate JS files
gulp.task('js', function (done) {    
    gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/slick-carousel/slick/slick.min.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream())
    done();
})

// icons
gulp.task('icons', function(done) {
   gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('src/webfonts'));
    done();
})

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('scss', function(done) { 
    browserSync.init({
        server: "./src"  
    })
    gulp.watch(['src/scss/*.scss'], gulp.parallel('scss'))
    gulp.watch("src/*.html").on('change', browserSync.reload)
    done();
}));

gulp.task('default', gulp.series('images', 'minify-css', 'js', 'icons', 'serve', function () {}));