const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

const paths = {
    html:{
        src: "./src/index.html",
        dest: "./dist/"
    },
    css:{
        src:["./src/**/*.scss", "./src/**/*.sass", "./src/**/*.css"],
        dest: "./dist/css"
    },
    img:{
        src: "./src/img/*",
        dest: "./dist/img/"
    }
}

function clean(){
    return del(["./dist/*", "!dist/img", "!dist/bootstrap", "!dist/fontello"]);
}

function html(){
    return gulp.src(paths.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest));
}

function css(){
    return gulp.src(paths.css.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(concat("styles.min.css"))
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest(paths.css.dest));
}

function img(){
    return gulp.src(paths.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.img.dest));
}

function watch(){
    gulp.watch(paths.css.src, css);
}

exports.html = html;
exports.css = css;
exports.img = img;
exports.clean = clean;
gulp.watch = watch;
exports.default = gulp.parallel(clean, html, css);