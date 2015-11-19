// Global dependencies
var fs = require('fs');

// Module definition
module.exports = function(file, data) {

    // Write data to a file
    fs.writeFile(file, JSON.stringify(data), function(error) {
        process.stdout.write(error);
    });

};
