/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function(URL) {

    // Require assets
    var REQUEST = GLOBAL.request || require('request'),
        EVENTS  = require('events');

    // Event listener
    var listener = new EVENTS.EventEmitter();

    // Load URL
    REQUEST(URL, function (error, response, body) {

        switch (response.statusCode) {
        case 200:
            process.stdout.write('Success'.green.bold);
            process.stdout.write(URL.gray, '\n');

            // Trigger success
            listener.emit('success', JSON.parse(body));
            break;

        case 408:
            process.stdout.write('Timeout'.red.bold);
            process.stdout.write(URL.gray, '\n');
            break;

        case 401:
            process.stdout.write('Unauthorized'.red.bold);
            process.stdout.write(URL.gray, '\n');
            break;

        case 500:
            process.stdout.write('Internal Server Error'.red.bold);
            process.stdout.write(URL.gray, '\n');
            break;

        case 502:
            process.stdout.write('Bad Gateway'.gray.bold);
            process.stdout.write(URL.gray, '\n');
            break;

        case 504:
            process.stdout.write('Timeout'.gray.bold);
            process.stdout.write(URL.gray, '\n');
            break;

        default:
            process.stdout.write(response.statusCode.toString().gray.bold);
            process.stdout.write(URL.gray, '\n');
            break;
        }

    });

    // Return listener
    return listener;

};
