// Plugins
var
  gulp = require("gulp"),
  util = require("gulp-util"),
  watch = require("gulp-watch"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  changed = require("gulp-changed"),
  // Custom paths
  myPaths = {
    js:{
      name:"mapScrollPrevent",
      src:"./src/**/*.js",
      dest:"./dist/"
    }
  }
;

// Compress JavaScript
gulp.task("compress", function() {
  gulp.src(myPaths.js.src)
  .pipe(uglify({ preserveComments:"some" }))
  .pipe(concat(myPaths.js.name+".min.js"))
  .pipe(gulp.dest(myPaths.js.dest));
});

// Watch for Changes
gulp.task("watch", function() {
  gulp.watch([myPaths.js.src], ["compress"]);
});

// Do Tasks as Default
gulp.task("default", ["compress", "watch"]);
