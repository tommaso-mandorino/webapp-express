import express from 'express';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = process.env.SERVER_PORT;

const server = express();

server.get('/',

    (request, response) => {

        console.log(`Someone visited the 'root' route.`);

        response.send('Welcome to the server!');

    }

);

server.listen(SERVER_PORT,

    () => {

        console.log(`Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);