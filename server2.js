// server.js (Node.js only)
/* const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}) */  

// server.js (with Express.js)
/*const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies come in requests to the server and 
// make them available in req.body

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}) */