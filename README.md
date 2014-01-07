plugging
========

Easy plugin architecture for node.js

plugin style
============

```javascript

var myHandler = require('./myHandler');

function doSomething () {
  //do stuff
}

function setUpCustomRoutes (app) {
  app.get('/custom/route', myHandler);
}

module.exports = function(options) {
  setUpCustomRoutes(options.app);
  doSomething(options.port);
}

```

then to use

```javascript

  var app = require('express')(),
      plugging = require('plugging')(__dirname + '/pluginsFolder'),
      http = require('http');
      
  var server = http.startServer(app);
  
  server.listen(app.get('port'), function () {
    plugging.start({
      app: app,
      port: app.get('port')
    });
  })

```
  
  
