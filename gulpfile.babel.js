import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import imagemin from 'gulp-imagemin';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import del from 'del';
import {create as bsCreate} from 'browser-sync';
const browserSync = bsCreate();

const dirs = {
	app: 'app',
	dist: 'dist'
};

const sassPaths = {
	src: `${dirs.app}/scss/styles.scss`,
	allFiles: `${dirs.app}/scss/**/*`
};

const imagePaths = {
	src: `${dirs.app}/images`
}

const jsPaths = {
	allFiles: `${dirs.app}/js/**/*.js`,
	src: `${dirs.app}/js/main.js`,
	outputFile: 'bundle.js'
}

function bundle (bundler) {
	bundler
		.bundle()
		.pipe(source(jsPaths.src))
		.pipe(buffer())
		.pipe(rename(jsPaths.outputFile))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dirs.app))
		.pipe(browserSync.stream());
}

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	})

	gulp.watch(sassPaths.allFiles, ['styles']);
	gulp.watch(jsPaths.allFiles, ['bundle']);
	gulp.watch(dirs.app + '/*.html').on('change', browserSync.reload);
});

gulp.task('styles', () => {
	return gulp.src(sassPaths.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dirs.app))
		.pipe(browserSync.stream());
});

gulp.task('images', () => {
	return gulp.src(imagePaths.src + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./images'));
});

gulp.task('bundle', () => {
	var bundler = browserify(jsPaths.src).transform(babelify, { presets: ['es2015'] });
	bundle(bundler);
});

gulp.task('usemin', ['images', 'bundle', 'delete-production'], () => {
	return gulp.src([dirs.app + '/*.html'])
		.pipe(usemin({
			js: [uglify],
			css: [cssnano] 
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('delete-production', () => {
	return del([
		'./*.html',
		'./styles.css',
		'./bundle.js'
	]);
});
