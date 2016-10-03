  /**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import inject from 'gulp-inject';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import revReplace from 'gulp-rev-replace';
import rev from 'gulp-rev';
import responsive from 'gulp-responsive';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src([
    'app/scripts/**/*.js',
    '!app/scripts/material.min.js'
  ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// Optimize images
gulp.task('images', () =>
  gulp.src(['app/images/**/*', '!app/images/speakers/**', '!app/images/agenda/**'])
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);

gulp.task('images2', ['images', 'images3'], () =>
  gulp.src('app/images/speakers/**')
    .pipe(responsive({
      '*.{png,jpg,jpeg}': {
        width: 100,
        quality: 50,
        withoutEnlargement: false,
      }
    }))
    .pipe(gulp.dest('dist/images/speakers'))
);

gulp.task('images3', ['images'], () =>
  gulp.src('app/images/agenda/**')
    .pipe(responsive({
      '*.png': {
        width: 50,
        withoutEnlargement: false,
      }
    }))
    .pipe(gulp.dest('dist/images/agenda'))
);

// Copy all files at the root level (app)
gulp.task('copy', () => {
  gulp.src([
    'app/*',
    'app.yaml',
    '!app/*.html'
    // 'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
  return gulp.src([
    'app/scripts/material.min.js'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/scripts'))
    .pipe($.size({title: 'copy'}));
});

// Copy all files at the root level (app)
gulp.task('assets', () => {
  gulp.src('app/assets/*')
      .pipe($.newer('.tmp/assets'))
      .pipe(gulp.dest('.tmp/assets'))
      .pipe($.newer('dist/assets'))
      .pipe(gulp.dest('dist/assets'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
    // '!app/styles/material.indigo-red.min.css'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'));
});

/**
 * Inject UTF8 Tags
 * @param {filePath} filePath .
 * @param {file} file .
 * @return {int} The sum of the two numbers.
 */
function injection(filePath, file) {
  return file.contents.toString('utf8');
}

gulp.task('inject', () => {
  del(['.tmp/**/*.html']);

  // FR
  gulp.src(['./app/*.html'])
    .pipe($.newer('.tmp'))
    .pipe(inject(gulp.src(['./app/partials/head.html']), {
      starttag: '<!-- inject:head:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/partials/menu.html']), {
      starttag: '<!-- inject:menu:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/partials/footer.html']), {
      starttag: '<!-- inject:footer:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/partials/platiniums.html']), {
      starttag: '<!-- inject:platiniums:{{ext}} -->',
      transform: injection
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('inject_en', () => {
  del(['.tmp/**/*.html']);

  // EN
  gulp.src(['./app/en/*.html'])
    .pipe($.newer('.tmp/en'))
    .pipe(inject(gulp.src(['./app/en/partials/head.html']), {
      starttag: '<!-- inject:head:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/en/partials/menu.html']), {
      starttag: '<!-- inject:menu:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/en/partials/footer.html']), {
      starttag: '<!-- inject:footer:{{ext}} -->',
      transform: injection
    }))
    .pipe(inject(gulp.src(['./app/en/partials/platiniums.html']), {
      starttag: '<!-- inject:platiniums:{{ext}} -->',
      transform: injection
    }))
    .pipe(gulp.dest('.tmp/en'))
    .pipe(gulp.dest('dist/en'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () => gulp.src([
  // Note: Since we are not using useref in the scripts build pipeline,
  //       you need to explicitly list your scripts here in the right order
  //       to be correctly concatenated
  //'./app/scripts/main.js',
  './app/scripts/utils.js',
  // Attention l'ordre de declaration des scripts est important (notamment l'ordre des composants)
  './app/scripts/components/favorite.js',
  './app/scripts/components/agenda-slot.js',
  './app/scripts/components/session-card.js',
  './app/scripts/components/agenda.js',
  './app/scripts/components/social-chip.js',
  './app/scripts/components/speaker-card.js',
  './app/scripts/speaker.js',
  './app/scripts/speakers.js',
  './app/scripts/agenda.js',
  './app/scripts/session.js'
  // Other scripts
])
  .pipe($.sourcemaps.init())
 .pipe($.babel())
 .pipe($.concat('main.js'))
 .pipe($.uglify({preserveComments: 'some'}))
 .pipe($.sourcemaps.write())
  .pipe(gulp.dest('.tmp/scripts/'))
  .pipe(gulp.dest('dist/scripts/'))
  .pipe($.size({title: 'scripts'}))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('.tmp/*.html')
    .pipe($.useref({searchPath: '{.tmp,app}'}))
    // Remove any unused CSS
    .pipe($.if('*.css', $.uncss({
      html: [
        '.tmp/*.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: []
    })))

    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.cssnano()))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['scripts', 'styles', 'assets', 'inject', 'inject_en'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });
  gulp.watch(['.tmp/**/*.html']);
  gulp.watch(['app/assets/*.json'], ['assets', reload]);
  gulp.watch(['app/**/*.html'], ['inject', 'inject_en', reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles', 'inject', 'inject_en',
    ['html', 'scripts', 'assets', 'images2', 'copy'],
    'generate-service-worker',
    'revreplace',
    cb
  )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('https://devfest.gdgnantes.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js',
                   'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/**/*.html`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: path.join(rootDir, path.sep)
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
gulp.task('revision', () => {
  return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'));
});

gulp.task('revreplace-yaml', ['revision'], () => {
  var manifest = gulp.src('./dist/rev-manifest.json');
  return gulp.src('dist/app.yaml')
    .pipe(revReplace({manifest: manifest, replaceInExtensions: '.yaml'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('revreplace', ['revreplace-yaml'], () => {
  var manifest = gulp.src('./dist/rev-manifest.json');
  return gulp.src('dist/**/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist'));
});
