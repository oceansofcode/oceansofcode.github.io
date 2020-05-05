/* eslint @typescript-eslint/indent: 0 */
/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-undef: 0*/
const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('./src/scripts/tsconfig.json');
const uglify = require('gulp-uglify-es').default;

const sass = require('gulp-sass');
const minifiy = require('gulp-clean-css');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');

const defaultTasks = ['html', 'htmlComponents', 'sass', 'typescript'];

const paths = {
  html: {
    'src': '**/*.html',
    'dest': './build/html',
    'exclude': ['!node_modules/**', '!src/**']
  },
  htmlComponents: {
    'src': './src/html/**/*.html',
    'dest': './build/html'
  },
  scripts: {
    'src': './src/scripts/**/*.ts',
    'dest': './build/scripts'
  },
  styles: {
    'src': './src/styles/**/*.scss',
    'dest': './build/styles'
  },
  images: {
    'src': './src/images/*',
    'dest': './build/images'
  }
};

/*
 * Validates html outputting the errors to the console log.
 */
gulp.task('html', () => {
  return gulp.src([paths.html.src, ...paths.html.exclude])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

/*
 * Validates html outputting the errors to the console log.
 */
gulp.task('htmlComponents', () => {
  return gulp.src(paths.htmlComponents.src)
    .pipe(gulp.dest(paths.htmlComponents.dest));
});

/*
 * Converts all the sass files to a single, minified main css file.
 */
gulp.task('sass', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(minifiy())
    .pipe(gulp.dest(paths.styles.dest));
});

/*
 * Converts all typescript files to their respective, uglified js file.
 */
gulp.task('typescript', () => {
  return gulp.src(paths.scripts.src)
    .pipe(tsProject())
    //.pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('image', () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('watch', () => {
  gulp.watch([paths.styles.src, paths.scripts.src, paths.htmlComponents.src], gulp.series('sass', 'typescript', 'htmlComponents'));
});

/*
 * Runs each task in parallel.
 */
gulp.task('default', gulp.parallel(...defaultTasks));