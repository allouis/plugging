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

module.exports = {
  init: function (app) {
    // Start the plugin e.g 
    setupCustomRoutes(app);
  }
}

```

then to use

```javascript

  var app = require('express')(),
      plugging = require('plugging')(app),
      http = require('http');
      
  var server = http.startServer(app);
  
  server.listen(app.get('port'), function () {
    plugging.start();
  })

```
  
  
