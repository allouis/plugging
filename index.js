var getPlugins = require('./lib/getPlugins'),
    setupConfig = require('./lib/setupConfig');

function plugging(options){
    var originalOptions = Array.apply([], arguments);

    var config = setupConfig();
    var plugins = getPlugins(config, options); 

    function start() {
        var extraOptions = Array.apply([], arguments); 
        var allOptions = originalOptions.concat(extraOptions);
        plugins.forEach(function(plugin){
            plugin[config.startPlugin].apply(plugin, allOptions); 
        });
    }

    return {
        start: start
    };

}

module.exports = plugging;
