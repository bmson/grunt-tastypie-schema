/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        tastypie_schema: {

            production: {
                login: {
                    url: 'https://www...',
                    params: {
                        username: '',
                        password: ''
                    }
                },
                options: {
                    keys: ['fields', 'filtering', 'ordering']
                },
                files: {
                    'response.json': 'https://www...'
                }
            }

        }

    });

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['tastypie_schema']);

};
