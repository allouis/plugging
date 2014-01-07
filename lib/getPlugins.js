var fs = require('fs');

function getPlugins (config, options) {

    var search = config.pluginsDir;
    var currentDir = process.cwd();
    var foundDir = findDir(currentDir, search);
    
    var plugins = fs.readdirSync(foundDir).map(function(file){
        return require(foundDir + '/' + file)(options);
    });

    if(!config.node_modules) return plugins;

    var node_modules = findDir(currentDir, "node_modules");

    fs.readdirSync(node_modules).forEach(function(file) {
        var path = node_modules + '/' + file;    
        if(require(path+'/package.json').plugging) {
            var plugin = require(path)(options);
            plugins.push( plugin );
        }
    });

    return plugins;

}

function findDir (start, search) {
    var found;
    var files = fs.readdirSync(start);
    files.forEach(function(file) {
        var path = start + '/' + file;
        if (file === search && fs.statSync(path).isDirectory()) {
            found = path; 
        }
    });
    if(!found) {
        var parentDir = goUp(start);
        if (parentDir.length === 0) {
            return {};
        }
        return findDir(parentDir, search);
    }
    return found;
}

function goUp (dir) {
    var paths = dir.split('/');
    paths.pop();
    return paths.join('/');
}

module.exports = getPlugins;
