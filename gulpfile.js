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
  pug = require("gulp-pug"),
  json = require("./package.json");

  // Custom paths
  myPaths = {
    coffee:{
      name:"googlemaps-scrollprevent",
      src:"./src/dist/**/*.coffee",
      dest:"./dist/"
    },
    pug:{
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
  .pipe(coffee("var version=0.0.0",{bare:true}))
  .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
  .pipe(gulp.dest(myPaths.coffee.dest))
  .pipe(uglify({ preserveComments:"some" }))
  .pipe(concat(myPaths.coffee.name+".min.js"))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest(myPaths.coffee.dest));
});

// Compile pug Templates
gulp.task('pug', function buildHTML() {
  gulp.src(myPaths.pug.src)
    .pipe(pug({
      pretty: true,
      data: {
        version : json.version
      }
    }))
    .pipe(gulp.dest(myPaths.pug.dest))
});

// Watch for Changes
gulp.task("watch", function() {
  gulp.watch([myPaths.coffee.src], ["coffee"]);
  gulp.watch([myPaths.pug.src], ["pug"]);
});

// Do Tasks as Default
gulp.task("default", ["coffee", "pug", "watch"]);
