// Plugins
var
  gulp = require("gulp"),
  util = require("gulp-util"),
  watch = require("gulp-watch"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  changed = require("gulp-changed"),
  sourcemaps = require("gulp-sourcemaps"),
  coffee = require("gulp-coffee");

  // Custom paths
  myPaths = {
    coffee:{
      name:"mapScrollPrevent",
      src:"./src/**/*.coffee",
      dest:"./dist/"
    }
  }
;

// Compile and Compress CoffeeScript
gulp.task("compress", function() {
  gulp.src(myPaths.coffee.src)
  .pipe(sourcemaps.init())
  .pipe(coffee({bare:true}))
  .pipe(gulp.dest(myPaths.coffee.dest))
  .pipe(uglify({ preserveComments:"some" }))
  .pipe(concat(myPaths.coffee.name+".min.js"))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest(myPaths.coffee.dest));
});

// Watch for Changes
gulp.task("watch", function() {
  gulp.watch([myPaths.coffee.src], ["compress"]);
});

// Do Tasks as Default
gulp.task("default", ["compress", "watch"]);
