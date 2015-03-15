var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')

  , paths =
    { js:
      { angular:
        [ './vendor/angularjs/angular.js'
        , './vendor/angularjs/angular-animate.js'
        , './vendor/angularjs/angular-route.js'
        , './vendor/angularjs/angular-sanitize.js'
        , './vendor/angularjs/angular-cookies.js'
        , './vendor/angularjs/select2.js'
        ]
      , site: './app/app.js'
      , plugins:
        [ './vendor/jquery.js'
        , './vendor/md5.js'
        , './vendor/select2.js'
        , './vendor/nprogress.js'
        ]
      }
    }

gulp.task('scripts', function () {

  gulp.src(paths.js.angular)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest('./build/'))

  browserify(paths.js.site)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'))

  gulp.src(paths.js.plugins)
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./build/'))

})

// Watch
gulp.task('watch', function () {
  gulp.watch('./app/**/*.js', ['scripts'])
})

// Default task
gulp.task('default', ['scripts', 'watch' ])

// Build all
gulp.task('build', ['scripts'] )