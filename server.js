var express = require('express'),
//we added the below line in class
  requestProxy = require('express-request-proxy'),
  // NOTE: require in our request proxy module
  port = process.env.PORT || 3000,
  app = express();


  app.use(express.static('./'));

  app.get('*', function(request, response) {
    console.log('New request:', request.url);
    response.sendFile('index.html', { root: '.' });
  });

  app.listen(port, function() {
    console.log('Server started on port ' + port + '!');
  });
