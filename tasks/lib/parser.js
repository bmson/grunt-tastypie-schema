/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function(URI, OPTIONS, CALLBACK) {

    // Require assets
    var APP    = require('./app'),
        EVENTS = require('events'),
        URL    = require('url');

    // Get domain
    var ORIGIN = URL.parse(URI),
        DOMAIN = ORIGIN.protocol + '//' + ORIGIN.host;

    // Create callback if missing
    CALLBACK = CALLBACK || {
        emitter: new EVENTS.EventEmitter(),
        json: {}
    };

    // Fetch URL
    APP.fetch(URI).on('success', function(json) {

        // Loop through keys
        for (var idx in json) {

            // Variables
            var myKey    = json[idx],
                mySchema = myKey.schema,
                hasKey   = (OPTIONS.keys).indexOf(idx) > -1;

            // Add idx if they exist in options
            if (hasKey) {
                CALLBACK.json[idx] = json[idx];
            }

            if (mySchema) {
                // Add schema as url
                CALLBACK.json[idx] = {
                    url: mySchema
                };

                // Parse schema
                APP.parser(DOMAIN + mySchema, OPTIONS, {
                    json:    CALLBACK.json[idx],
                    emitter: CALLBACK.emitter
                });
            }

        };

        // Trigger emitter
        CALLBACK.emitter.emit('write');

    });

    // Return
    return CALLBACK;

};
