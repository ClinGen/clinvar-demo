module.exports = function(grunt) {
'use strict';

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'js/bundle.js': [
                        'app/**/*.jsx',
                        'js/src/**/*.js',
                        'js/vendor/bootstrap.min.js'
                    ]
                },
                options: {
                    transform: [require('grunt-react').browserify]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    outputStyle: 'compressed'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/bundle.min.js': [
                        'js/bundle.js'
                    ]
                },
                options: {
                    sourceMap: true
                }
            }
        },
        watch: {
            compass: {
                files: [
                    'sass/**/*.scss'
                ],
                tasks: ['compass']
            },
            js: {
                files: [
                    'app/**/*.jsx',
                    'js/src/**/*.js'
                ],
                tasks: ['browserify', 'uglify']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: true
                },
                files: [
                    'css/*.css',
                    'js/bundle.min.js',
                    '*.html'
                ]
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');

    // Register tasks
    grunt.registerTask('default', [
        'compass', 'browserify', 'uglify'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
