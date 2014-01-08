var getPlugins = require('./lib/getPlugins'),
    setupConfig = require('./lib/setupConfig');

function plugging(pluginsDir){

  var options = Array.prototype.slice.call(arguments, 1);
  var config = setupConfig();
  var plugins = getPlugins(pluginsDir); 

  function start() {
    var options = Array.apply([], arguments); 
    plugins.forEach(function(plugin){
      var pluginStart = plugin.constructor === Function ?
        plugin : plugin[config.init];
      pluginStart.apply(plugin, options);
    });
  }

  if (options[0]) {
    start.apply(null, options);
    return;
  }

  return {
    start: start
  };

}

module.exports = plugging;
