const http = require('http');

const fs = require('fs');


const requestHandler = ((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Create User</title></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text"><button type="submit">Create</button> </input></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body><ol>User1</ol><ol>User2</ol></body>');
    res.write('</html>');
  }

  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }

});

const server = http.createServer(requestHandler);

server.listen(3000);
