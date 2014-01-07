var getPlugins = require('./lib/getPlugins'),
    setupConfig = require('./lib/setupConfig');

function plugging(pluginsDir){

  var config = setupConfig(pluginsDir);
  var plugins = getPlugins(config); 

  function start() {
    var options = Array.apply([], arguments); 
    plugins.forEach(function(plugin){
      plugin.apply(plugin, options); 
    });
  }

  return {
    start: start
  };

}

module.exports = plugging;
