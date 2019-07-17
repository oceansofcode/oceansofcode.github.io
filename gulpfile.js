const gulp = require('gulp')
const htmlhint = require('gulp-htmlhint')

const ts = require('gulp-typescript')
const tsProject = ts.createProject('./src/scripts/tsconfig.json')
const uglify = require('gulp-uglify-es').default

const sass = require('gulp-sass')
const minifiy = require('gulp-minify-css')
const concat = require('gulp-concat')
sass.compiler = require('node-sass')
const imagemin = require('gulp-imagemin')

const defaultTasks = ['html', 'sass', 'typescript']

const paths = {
  html: {
    'src': '**/*.html',
    'exclude': ['!node_modules/**', '!src/**']
  },
  scripts: {
    'src': './src/scripts/**/*.ts',
    'dest': './build/scripts'
  },
  styles: {
    'src': './src/styles/*.scss',
    'dest': './build/styles'
  },
  images: {
    'src': './src/images/*',
    'dest': './build/images'
  }
}

/*
 * Validates html outputting the errors to the console log.
 */
gulp.task('html', () => {
  return gulp.src([paths.html.src, ...paths.html.exclude])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
})

/*
 * Converts all the sass files to a single, minfied main css file.
 */
gulp.task('sass', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(minifiy())
    .pipe(gulp.dest(paths.styles.dest))
})

gulp.task('sassPages', () => {
  return gulp.src('./src/styles/pages/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifiy())
    .pipe(gulp.dest(`${paths.styles.dest}/pages`))
})

/*
 * Converts all typescript files to their respective, uglified js file.
 */
gulp.task('typescript', () => {
  return gulp.src(paths.scripts.src)
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('image', () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
})

gulp.task('watch', () => {
  gulp.watch([paths.styles.src, paths.scripts.src, './src/styles/pages/*.scss'], gulp.series('sass', 'sassPages', 'typescript'))
})

/*
 * Runs each task in paralell.
 */
gulp.task('default', gulp.parallel(...defaultTasks))
