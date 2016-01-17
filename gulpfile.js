var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssNano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    coffee      = require('gulp-coffee'),
    gutil       = require('gulp-util'),
    nodemon     = require('gulp-nodemon'),
    batch       = require('gulp-batch'),
    watch       = require('gulp-watch'),
    jade        = require('gulp-jade'),
    htmlHint    = require('gulp-htmlhint'),
    htmlStylish = require('htmlhint-stylish'),
    browserSync = require('browser-sync');


var server_dir = 'project_files/server/',
    client_dir ='project_files/client/';

var paths = {
    server: {
        config: {
            source  : [server_dir+'config/*.coffee', server_dir+'config/**/*.coffee'],
            dest    : 'config'
        },
        models: {
            source: [server_dir+'models/*.coffee', server_dir+'models/**/*.coffee'],
            dest: 'app/models'
        },
        routes: {
            source: [server_dir+'routes/*.coffee', server_dir+'routes/**/*.coffee'],
            dest: 'app/routes'
        },
        server_file: {
            source: server_dir+'server.coffee',
            dest:   './'
        }
    },
    client: {
        controllers: {
            source: [client_dir+'controllers/*.coffee', client_dir+'controllers/**/*.coffee'],
            dest: 'public/app/controllers'
        },
        services: {
            source: [client_dir+'services/*.coffee', client_dir+'services/**/*.coffee'],
            dest: 'public/app/services'
        },
        scss: {
            source: [client_dir+'scss/*.scss', client_dir+'scss/**/*.scss'],
            dest: 'public/assets/css'
        },
        views: {
            pages: {
                source: [client_dir+'views/pages/*.jade', client_dir+'views/pages/**/*.jade'],
                dest: 'public/app/views/pages',
                dev: client_dir+'views/html_develop/pages'
            },
            blocks: {
                source: [client_dir+'views/blocks/*.jade', client_dir+'views/blocks/**/*.jade'],
                dest: 'public/app/views/blocks/',
                dev: client_dir+'views/html_develop/blocks'
            }
        },
        angular_files: {
            source: client_dir+'*.coffee',
            dest: 'public/app'
        }
    }
};

gulp.task('ng-service', function(){
    return gulp.src(paths.client.services.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.client.services.dest))
});

gulp.task('ng-controllers', function(){
    return gulp.src(paths.client.controllers.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.client.controllers.dest))
});

gulp.task('angularApp', function () {
    return gulp.src(paths.client.angular_files.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.client.angular_files.dest));
})

gulp.task('server', function(){
    return gulp.src(paths.server.server_file.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.server.server_file.dest));
});

gulp.task('configs', function () {
    return gulp.src(paths.server.config.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.server.config.dest));
});

gulp.task('models', function(){
    return gulp.src(paths.server.models.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.server.models.dest));
});

gulp.task('routes', function(){
    return gulp.src(paths.server.routes.source)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.server.routes.dest));
});

gulp.task('sass', function(){
    return gulp.src(paths.client.scss.source)
        .pipe(sass())
        .pipe(cssNano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.client.scss.dest));
});

gulp.task('jade-page', function(){
    return gulp.src(paths.client.views.pages.source)
        .pipe(gulp.dest(paths.client.views.pages.dest))
        .pipe(jade({
            pretty: true
        }))
        .pipe(htmlHint())
        .pipe(htmlHint.reporter('htmlhint-stylish'))
        .pipe(htmlHint.failReporter({supress: false}))
        .pipe(gulp.dest(paths.client.views.pages.dev));
});

gulp.task('jade-block', function(){
    return gulp.src(paths.client.views.blocks.source)
        .pipe(gulp.dest(paths.client.views.blocks.dest))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.client.views.blocks.dev));
});

gulp.task('watch', function(){
    watch(paths.server.server_file.source, batch(function (event, done) {
        gulp.start('server', done);
    }));
    watch(paths.server.config.source, batch(function (event, done) {
        gulp.start('configs', done);
    }));
    watch(paths.server.models.source, batch(function (event, done) {
        gulp.start('models', done);
    }));
    watch(paths.server.routes.source, batch(function (event, done) {
        gulp.start('routes', done);
    }));
    watch(paths.client.scss.source, batch(function (events, done) {
        gulp.start('sass', done);
    }));
    watch(paths.client.views.pages.source, batch(function (event, done) {
        gulp.start('jade-page', done);
    }));
    watch(paths.client.views.blocks.source, batch(function (event, done) {
        gulp.start('jade-block', done);
    }));
    watch(paths.client.angular_files.source, batch(function (event, done) {
        gulp.start('angularApp', done);
    }));
    watch(paths.client.services.source, batch(function (event, done) {
        gulp.start('ng-service', done);
    }));
    watch(paths.client.controllers.source, batch(function (event, done) {
        gulp.start('ng-controllers', done);
    }));
});

gulp.task('nodemon', function(cb){
    var started = false;
    return nodemon({
        script: 'server.js'
    })  .on('start', function(){
        if(!started){
            cb();
            started = true;
        }
    })
        .on('change', ['watch'])
        .on('restart',  function(){
            gutil.log('Server Restarted');
        });
});

gulp.task('default', ['browserSync']);


var brsSyncStream = function() {
    return browserSync.reload({
        stream: true
    });
}

gulp.task('browserSync', ['nodemon'], function(){
    browserSync.init(null, {
        proxy: 'http://localhost:5000',
        files: [
            'public/app/*.js',
            'public/app/views/**/*.jade',
            'public/assets/css/*.css',
            'server.js',
            'app/**/*.js'
            ],
        port: 7000
    });
});