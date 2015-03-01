/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function (GRUNT) {

    // Require APP assets
    var APP     = require('./lib/app'),
        REQUEST = require('request');

    // Add request to global scope with session cookie
    GLOBAL.request = REQUEST.defaults({
        jar: true
    });

    // Create grunt task
    GRUNT.registerMultiTask('tastypie_schema', 'Crawls the Tastypie schema and exports as json', function () {

        // Run grunt asynchronously
        this.async();

        // Options
        var OPTIONS = this.options({
            keys: ['fields', 'filtering', 'ordering']
        });

        // Login credentials
        var CREDENTIALS = {
            url:    this.data.login && this.data.login.url,
            params: this.data.login && this.data.login.params
        };

        // Files variables
        var FILES = this.files;

        // Login
        APP.login(CREDENTIALS).on('success', function() {

            FILES.forEach(function(file) {

                // Variables
                var dest = file.orig.dest,
                    src  = file.orig.src[0];

                // Parse URL
                var parser  = APP.parser(src, OPTIONS),
                    emitter = parser.emitter,
                    json    = parser.json;

                // Save to file when write is triggered
                emitter.on('write', function() {
                    APP.save(dest, json);
                });

            });

        });

    });

};
