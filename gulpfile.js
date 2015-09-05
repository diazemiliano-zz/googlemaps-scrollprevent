// Plugins
var
  gulp = require("gulp"),
  util = require("gulp-util"),
  watch = require("gulp-watch"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  changed = require("gulp-changed"),
  sourcemaps = require("gulp-sourcemaps"),
  prettify = require('gulp-jsbeautifier'),
  coffee = require("gulp-coffee"),
  jade = require("gulp-jade");

  // Custom paths
  myPaths = {
    coffee:{
      name:"mapScrollPrevent",
      src:"./src/dist/**/*.coffee",
      dest:"./dist/"
    },
    jade:{
      src:[
        "./src/examples/**/*.jade",
        "!./src/examples/**/**_**.jade"
      ],
      dest:"./examples/"
    }
  }
;

// Compile and Compress CoffeeScript
gulp.task("coffee", function() {
  gulp.src(myPaths.coffee.src)
  .pipe(sourcemaps.init())
  .pipe(coffee({bare:true}))
  .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
  .pipe(gulp.dest(myPaths.coffee.dest))
  .pipe(uglify({ preserveComments:"some" }))
  .pipe(concat(myPaths.coffee.name+".min.js"))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest(myPaths.coffee.dest));
});

// Compile Jade Templates
gulp.task('jade', function() {
  gulp.src(myPaths.jade.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(myPaths.jade.dest))
});

// Watch for Changes
gulp.task("watch", function() {
  gulp.watch([myPaths.coffee.src], ["coffee"]);
  gulp.watch([myPaths.jade.src], ["jade"]);
});

// Do Tasks as Default
gulp.task("default", ["coffee", "jade", "watch"]);
