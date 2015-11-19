/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function(LOGIN) {

    // Require assets
    var REQUEST = GLOBAL.request || require('request'),
        EVENTS  = require('events');

    // Options
    var OPTIONS = {
        url:  LOGIN.url,
        json: LOGIN.params
    };

    // Event listener
    var LISTENER = new EVENTS.EventEmitter();

    // Emit success
    var EMITTER = function(event) {
        event.emit('success');
    };

    // Clear console
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    // Send login request or trigger success if login is not needed
    OPTIONS.url ? REQUEST.post(OPTIONS, function(error, response) {

        switch (response.statusCode) {
        case 401:
            process.stdout.write('Login: failed'.red.bold, '\n');
            break;

        case 201:
            process.stdout.write('Login: successful'.gray.bold.underline, '\n');

            // Trigger success
            setTimeout(EMITTER, 100, LISTENER);  
            break;
        }

    }) : setTimeout(EMITTER, 100, LISTENER);

    // Return LISTENER
    return LISTENER;

};
