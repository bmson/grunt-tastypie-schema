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
        EVENTS  = require('events'),
        COLORS  = require('colors');

    // Event listener
    var listener = new EVENTS.EventEmitter();

    // Load URL
    REQUEST(URL, function (error, response, body) {

        switch (response.statusCode) {
            case 200:
                console.log('Success'.green.bold);
                console.log(URL.gray, '\n');

                // Trigger success
                listener.emit('success', JSON.parse(body));
            break;

            case 408:
                console.log('Timeout'.red.bold);
                console.log(URL.gray, '\n');
            break;

            case 401:
                console.log('Unauthorized'.red.bold);
                console.log(URL.gray, '\n');
            break;

            case 500:
                console.log('Internal Server Error'.red.bold);
                console.log(URL.gray, '\n');
            break;

            case 502:
                console.log('Bad Gateway'.gray.bold);
                console.log(URL.gray, '\n');
            break;

            case 504:
                console.log('Timeout'.gray.bold);
                console.log(URL.gray, '\n');
            break;

            default:
                console.log(response.statusCode.toString().gray.bold);
                console.log(URL.gray, '\n');
            break;
        }

    });

    // Return listener
    return listener;

};
