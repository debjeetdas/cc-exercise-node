// create http variable - importing http
const http = require('http');

// create app variable - importing app.js
const app = require('./app');

// setting port number from environment variables || 3000
const port = process.env.PORT || 3000;

// creating server that channels all requests through app.js
const server = http.createServer(app);

// starting the server on the port
console.log('starting server at port :', port);
server.listen(port);
console.log('started application at port :', port);