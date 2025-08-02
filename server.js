import express from 'express';

import movieRouter from './routers/movieRouter.js';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = process.env.SERVER_PORT;

const server = express();

server.use(express.static('public'));
server.use('/api/movies', movieRouter);



server.get('/',

    (request, response) => {

        console.log(`➕ New request on 'root' route from IP: ${request.ip}.`);

        response.send('Welcome to the server!');

    }

);



server.listen(SERVER_PORT,

    () => {

        console.log(`⏳ Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);