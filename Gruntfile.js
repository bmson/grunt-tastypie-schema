// Global dependencies
var loadGruntTasks = require('load-grunt-tasks')

// Module definition
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
    loadGruntTasks(grunt);
    grunt.loadTasks('tasks');

    // Register task
    grunt.registerTask('default', ['tastypie_schema']);

};
