var utils = {
    extend: function (obj1, obj2) { 
        for(var prop in obj2) {
            obj1[prop] = obj2[prop];
        }
        return obj1;
    }
};

module.exports = utils;
