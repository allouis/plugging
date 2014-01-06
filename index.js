var getPlugins = require('./lib/getPlugins'),
    setupConfig = require('./lib/setupConfig');

function plugging(){
    var originalOptions = Array.apply([], arguments);

    var config = setupConfig();
    var plugins = getPlugins(config); 

    function start() {
        var extraOptions = Array.apply([], arguments); 
        var allOptions = originalOptions.concat(extraOptions);
        plugins.forEach(function(plugin){
            plugin[config.init].apply(plugin, allOptions); 
        });
    }

    return {
        start: start
    };

}

module.exports = plugging;
