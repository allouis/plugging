var fs = require('fs');
var path = require('path');

function getPlugins (pluginsDir) {

  var pathToPlugins = path.resolve(pluginsDir);

  var plugins = fs.readdirSync(pathToPlugins).map(returnPlugin.bind(pathToPlugins));

  return plugins;

}

function returnPlugin (path) {
  // this refers to bound string
  return require(this + '/' + path);
}

module.exports = getPlugins;
