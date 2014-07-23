'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            ts: {
                files: ['src/**/{,*/}*.ts'],
                tasks: ['ts:build']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            'build/**/*.*'
                        ]
                    }
                ]
            }
        },

        ts: {
           dist: {
                src: ["src/**/*.ts"],
                reference: "src/reference.ts",
                out: 'build/simple-layout-js.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true,
                    removeComments: true,
                    declaration: true
                }
           },
           localdist: {
                src: ["src/**/*.ts"],
                reference: "src/reference.ts",
                out: '../simple-layout-js-examples/bower_components/simple-layout-js/build/simple-layout-js.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true,
                    removeComments: true
                }
           }
        },

        tsd: {
            refresh: {
                options: {
                    command: 'reinstall',
                    latest: true,
                    config: 'tsd.json'
                },
                opts: {
                    // props from tsd.Options
                }
            }
        }

    });


    grunt.registerTask('default', [
        'tsd:refresh',
        'clean:dist',
        'ts:dist'
    ]);
};
