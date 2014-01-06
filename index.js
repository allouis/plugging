var getPlugins = require('./lib/getPlugins');

function plugging(){
    var originalOptions = Array.apply([], arguments);
    var config = {
        pluginsDirectory: 'pluggings',
        init: 'init'
    };

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
