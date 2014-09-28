'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        jsdoc : {
            dist : {
                src: ['docs_src/**/*.js'],
                options: {
                    destination: '../simple-layout-editor/app/docs',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "jsdoc.conf.json"
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            ts: {
                files: ['src/**/{,*/}*.ts'],
                tasks: ['dev']
            },
            docs: {
                files: ['src/**/{,*/}*.ts'],
                tasks: ['documentation']
            }
        },

        // Empties folders to start fresh
        clean: {
            all: {
                files: [
                    {
                        dot: true,
                        src: [
                            'build/**/*.*', 'defs/simple-layout-js/**/*.*', 'docs', 'docs_src'
                        ]
                    }
                ]
            },
            documentationSrc: {
                files: [
                    {
                        dot: true,
                        src: [
                            'docs_src'
                        ]
                    }
                ]
            },
            documentation: {
                files: [
                    {
                        dot: true,
                        src: [
                            'docs', 'docs_src'
                        ]
                    }
                ]
            },
            libDefinitions: {
                files: [
                    {
                        dot: true,
                        src: ['build/simple-layout-js.d.ts']
                    }
                ]
            },
            implDefinitions: {
                files: [
                    {
                        dot: true,
                        src: ['build/simple-layout-for-*.d.ts']
                    }
                ]
            }
        },

        ts: {
            distLib: {
                src: ["src/SimpleLayout/**/*.ts"],
                reference: "src/SimpleLayout/reference.ts",
                out: 'build/simple-layout-js.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true,
                    removeComments: false,
                    declaration: true
                }
            },
            forDocs: {
                src: ["src/SimpleLayout/**/*.ts"],
                reference: "src/SimpleLayout/reference.ts",
                outDir: 'docs_src',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: false,
                    removeComments: false,
                    declaration: true
                }
            },
            distCreateJS: {
                src: ["src/CreateJSImpl/**/*.ts"],
                reference: "src/CreateJSImpl/reference.ts",
                out: 'build/simple-layout-for-createjs.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true,
                    removeComments: false,
                    declaration: true
                }
            },
            distPixiJS: {
                src: ["src/PixiJSImpl/**/*.ts"],
                reference: "src/PixiJSImpl/reference.ts",
                out: 'build/simple-layout-for-pixijs.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true,
                    removeComments: false,
                    declaration: true
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
        },

        copy: {
            libDefinitions: {
                files: [
                    {expand: true, cwd: 'build', src: ['simple-layout-js.d.ts'], dest: 'defs/simple-layout-js/', flatten: true, filter: 'isFile'}
                ]
            },
            implDefinitions: {
                files: [
                    {expand: true, cwd: 'build', src: ['simple-layout-for-*.d.ts'], dest: 'defs/simple-layout-js/', flatten: true, filter: 'isFile'}
                ]
            },
            dev: {
                files: [
                    {expand: true, cwd: 'defs/simple-layout-js', src: ['*.d.ts'], dest: '../simple-layout-editor/app/defs/simple-layout-js/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'build', src: ['*.*'], dest: '../simple-layout-editor/bower_components/simple-layout-js/build', flatten: true, filter: 'isFile'}
                ]
            }
        },

        replace: {
            createjsReferences: {
                src: ['defs/simple-layout-js/simple-layout-for-createjs.d.ts'],
                overwrite: true,
                replacements: [
                    {
                        from: 'defs/tsd.d.ts',
                        to: 'easeljs/easeljs.d.ts'
                    }
                ]
            },
            pixijsReferences: {
                src: ['defs/simple-layout-js/simple-layout-for-pixijs.d.ts'],
                overwrite: true,
                replacements: [
                    {
                        from: 'defs/tsd.d.ts',
                        to: 'pixi/pixi.d.ts'
                    }
                ]
            }
        }
    });


    grunt.registerTask('documentation', [
        'clean:documentation',
        'ts:forDocs',
        'jsdoc',
        'clean:documentationSrc'
    ]);

    grunt.registerTask('default', [
        'clean:all',
        'ts:distLib',
        'copy:libDefinitions',
        'clean:libDefinitions',
        'ts:distCreateJS',
        'ts:distPixiJS',
        'documentation',
        'copy:implDefinitions',
        'clean:implDefinitions',
        'replace'
    ]);

    grunt.registerTask('dev', [
        'default',
        'copy:dev'
    ]);
};
