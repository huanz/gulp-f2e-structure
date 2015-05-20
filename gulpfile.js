var gulp = require('gulp');
var RevAll = require('gulp-rev-all');


gulp.task('default', function() {
	var revAll = new RevAll({
		dontGlobal: ['.json'],
		dontRenameFile: [/^\/views\/(.*)/i, /^\/js\/libs\/(.*)\.js/i, /^\/js\/sea-modules\/(.*).js/i],
		dontUpdateReference: [ /^\/views\/(.*)/i, /^\/js\/libs\/(.*)\.js/i, /^\/js\/sea-modules\/(.*).js/i]
	});
    gulp.src('src/**')
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('./')); 
});