/*
 * grunt-tastypie-schema
 * https://github.com/irish-cream/tree/grunt-plugins
 *
 * Copyright (c) 2015 SocialCode
 * Licensed under the MIT license.
 */

module.exports = function(FILE, DATA) {

    // Require assets
    var FS = require('fs');

    // Save JSON
    FS.writeFile(FILE, JSON.stringify(DATA), function(error) {
        process.stdout.write(error);
    });

};
