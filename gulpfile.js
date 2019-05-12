const gulp = require('gulp')
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./src/scripts/tsconfig.json');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('typescript', () => {
    return gulp.src('./src/scripts/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('./build/scripts'));
});