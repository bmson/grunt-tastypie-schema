// Global dependencies
var request = require('request');

// Local dependencies
var login  = require('./lib/login');
var parser = require('./lib/parser');
var save   = require('./lib/save');

// Module definition
module.exports = function(grunt) {

    // Add request to global scope with session cookie
    GLOBAL.request = request.defaults({
        jar: true
    });

    // Create grunt task
    grunt.registerMultiTask('tastypie_schema', 'Crawls the Tastypie schema and exports as json', function () {

        // Run asynchronously
        this.async();

        // Options
        var options = this.options({
            keys: ['fields', 'filtering', 'ordering']
        });

        // Files variables
        var files = this.files;

        // Login credentials
        var promise = login({
            url:    this.data.login && this.data.login.url,
            params: this.data.login && this.data.login.params
        });

        // Login success
        promise.on('success', function() {

            files.forEach(function(file) {

                // Paths
                var output = file.orig.dest;
                var input  = file.orig.src[0];

                // Parse URL
                var pars    = parser(input, options);
                var emitter = pars.emitter;
                var json    = pars.json;

                // Save to file when write is triggered
                emitter.on('write', function() {
                    save(output, json);
                });

            });

        });

    });

};
