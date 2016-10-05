var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

function proxyGithub(request, response) {
  console.log('Routing Github request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: {
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  }))(request, response);
};

app.get('/github/*', proxyGithub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
