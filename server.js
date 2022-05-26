const http = require('http');
const path = require('path');
const static = require('node-static');

const port = process.env.PORT || 3000;
const file = new static.Server(path.join(__dirname, 'dist'));

http
  .createServer((req, res) => {
    file.serve(req, res);
  })
  .listen(port);
