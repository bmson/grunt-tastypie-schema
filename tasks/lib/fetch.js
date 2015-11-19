// Global dependencies
var Events  = require('events');
var request = GLOBAL.request || require('request');

// Module definition
module.exports = function(url) {

    // Event emitter
    var eventEmitter = new Events.EventEmitter();

    // Request url
    request(url, function(error, response, body) {

        switch (response.statusCode) {
        case 200:
            process.stdout.write('Success');
            process.stdout.write(url, '\n');

            // Emit success
            eventEmitter.emit('success', JSON.parse(body));
            break;

        case 408:
            process.stdout.write('Timeout');
            process.stdout.write(url, '\n');
            break;

        case 401:
            process.stdout.write('Unauthorized');
            process.stdout.write(url, '\n');
            break;

        case 500:
            process.stdout.write('Internal Server Error');
            process.stdout.write(url, '\n');
            break;

        case 502:
            process.stdout.write('Bad Gateway');
            process.stdout.write(url, '\n');
            break;

        case 504:
            process.stdout.write('Timeout');
            process.stdout.write(url, '\n');
            break;

        default:
            process.stdout.write(response.statusCode.toString());
            process.stdout.write(url, '\n');
            break;
        }

    });

    // Return emitter
    return eventEmitter;

};
