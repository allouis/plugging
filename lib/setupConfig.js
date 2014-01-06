var fs = require('fs');
var extend = require('./utils').extend;

var defaultConfig = { // TODO: move to extrernal file;
    pluginsDir: 'pluggings',
    startPlugin: 'init',
    node_modules: true
};

function setupConfig () {
    
    var currentDir = process.cwd();
    // passing second param to fit same pattern as getPlugins;
    var localConfig = findConfig(currentDir, "plugging.json") || {}; 

    return extend(defaultConfig, localConfig);

}

function findConfig (start, search) { // TODO: create general file traversal and search;
    var found;
    var files = fs.readdirSync(start);
    files.forEach(function(file) {
        var path = start + '/' + file;
        if (file === search) {
            found = path; 
        }
    });
    if(!found) {
        var parentDir = goUp(start);
        if (parentDir.length === 0) {
            return {};
        }
        return findConfig(parentDir, search);
    }
    return parseConfig(found);
}

function goUp (dir) {
    var paths = dir.split('/');
    paths.pop();
    return paths.join('/');
}

function parseConfig (path) { // In case I decide to move to an rc file;
    return require(path); 
}

module.exports = setupConfig;
