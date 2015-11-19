// Global dependencies
var Events = require('events');
var url    = require('url');

// Local dependencies
var fetch  = require('./fetch');
var parser = require('./parser');


// Module definition
module.exports = function(uri, options, callback) {

    // Get domain
    var origin = url.parse(uri),
        domain = origin.protocol + '//' + origin.host;

    // Create callback if missing
    callback = callback || {
        emitter: new Events.EventEmitter(),
        json: {}
    };

    // Fetch URL
    fetch(uri).on('success', function(json) {

        // Loop through keys
        for (var idx in json) {

            // Variables
            var schema = json[idx].schema;
            var hasKey = (options.keys).indexOf(idx) > -1;

            // Add idx if they exist in options
            if (hasKey) {
                callback.json[idx] = json[idx];
            }

            if (schema) {

                // Add schema as url
                callback.json[idx] = {
                    url: schema
                };

                // Parse schema
                parser(domain + schema, options, {
                    json:    callback.json[idx],
                    emitter: callback.emitter
                });

            }

        }

        // Trigger emitter
        callback.emitter.emit('write');

    });

    // Return
    return callback;

};
