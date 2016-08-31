'use strict';
//if you wanna attach karma star to gulp, you can, but make sure bundle first and make sure it finishes before running test
const gulp = require('gulp');
const eslint = require('gulp-eslint');
// const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js', 'app/*.js', 'app/templates/*.js', 'app/**/*.html', 'app/**/*.scss'];
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');

const source = {
  html: __dirname + '/app/**/*.html',
  js: __dirname + '/app/app.js',
  test: __dirname + '/test/*_spec.js',
  directive: __dirname + '/app/*.js',
  sass: __dirname + '/app/**/*.scss',
  img: __dirname + '/app/img/*',
  env: __dirname + '/app/env.js'
};

gulp.task('copy-env', ()=>{
  return gulp.src(source.env)
    .pipe(gulp.dest('./public'));
});

gulp.task('sassy:dev', ()=>{
  gulp.src(__dirname + '/app/sass/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('img', ()=>{
  return gulp.src(source.img)
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('copy', ()=>{
  return gulp.src([source.html,source.img])
    .pipe(gulp.dest('./public'));
});

// gulp.task('bundle:test', ()=>{
//   return gulp.src(source.test)
//     .pipe(webpack({
//       output: {
//         filename: 'test_bundle.js'
//       },
//       module: {
//         loaders: [
//           {test:  /\.scss$/, loaders: ['style', 'css', 'sass']}
//         ]
//       }
//     }))
//     .pipe(gulp.dest('./test'));
// });

gulp.task('bundle:dev', function(){
  return gulp.src(source.directive)
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: 'file-loader?name=img/img-[hash:6].[ext]'
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
  }))
  .pipe(gulp.dest('./public'));
});

gulp.task('eslint', function(){
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

// gulp.task('test', function(){
//   return gulp.src( __dirname + '/test/test.js', {read: false})
//   .pipe(mocha({reporter: 'nyan'}));
// });

gulp.task('watcher', function(){
  gulp.watch( paths, ['bundle:dev','sassy:dev']);
});

gulp.task('default', ['copy', 'sassy:dev', 'bundle:dev','img']);
