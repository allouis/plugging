var fs = require('fs');

function getPlugins (config, cb) {

    var search = config.pluginsDirectory;
    var currentDir = process.cwd();
    var foundDir = findDir(currentDir, search);
    
    var plugins = fs.readdirSync(foundDir).map(function(file){
        return require(foundDir + '/' + file);
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
        return findDir(goUp(start), search);
    }
    return found;
}

function goUp (dir) {
    var paths = dir.split('/');
    paths.pop();
    return paths.join('/');
}

module.exports = getPlugins;
