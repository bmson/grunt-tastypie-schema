// Global dependencies
var Events  = require('events');
var request = GLOBAL.request || require('request');

// Module definition
module.exports = function(login) {

    // Event emitter
    var eventEmitter = new Events.EventEmitter();

    // Emit success
    var emitter = function(event) {
        event.emit('success');
    };

    // Clear console
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    // Send login request or emit success if login is not needed
    if (login.url) {

        // Request url
        var promise = request.post({
            url:  login.url,
            json: login.params
        });

        // Request response
        promise.on('response', function(error, response) {

            switch (response.statusCode) {
            case 401:
                process.stdout.write('Login: failed', '\n');
                break;

            case 201:
                process.stdout.write('Login: successful', '\n');

                // Trigger success
                setTimeout(emitter, 100, eventEmitter);  
                break;
            }

        });

    } else {

        setTimeout(emitter, 100, eventEmitter);

    }

    // Return emitter
    return eventEmitter;

};
