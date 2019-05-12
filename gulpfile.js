const gulp = require('gulp')

const htmlhint = require('gulp-htmlhint');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('./src/scripts/tsconfig.json');
const uglify = require('gulp-uglify-es').default;

const sass = require('gulp-sass');
const minifiy = require('gulp-minify-css');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');
let defaultTasks = ['validateHtml', 'sass', 'typescript'];

gulp.task('validateHtml', () => {
    const exclude = ['!node_modules/**', '!src/**']
    return gulp.src(['**/*.html', ...exclude])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('sass', () => {
    return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(minifiy())
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('typescript', () => {
    return gulp.src('./src/scripts/**/*.ts')
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('default', gulp.parallel(...defaultTasks));