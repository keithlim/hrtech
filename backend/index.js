const dotenv = require('dotenv');
dotenv.config();

// to assist with where to store uploaded csv files
global.__basedir = __dirname + "/..";

const app = require('./src/app');

// create HTTP server
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Running on port: ', port);
});