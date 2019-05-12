const gulp = require('gulp')
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./src/scripts/tsconfig.json');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('typescript', () => {
    return gulp.src('./src/scripts/*.ts')
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('default', gulp.parallel('sass', 'typescript'));