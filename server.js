import express from 'express';

import movieRouter from './routers/movieRouter.js';

import routeNotFound from './middlewares/errors/notFound.js';
import internalServerError from './middlewares/errors/internalServerError.js';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = process.env.SERVER_PORT;

const server = express();

server.use(express.static('public'));
server.use('/api/movies', movieRouter);



server.get('/',

    (request, response) => {

        console.log(`➕ New request on 'root' route from IP: ${request.ip}.`);

        response.send('Server is running...');

    }

);



server.use(routeNotFound);
server.use(internalServerError);



server.listen(SERVER_PORT,

    () => {

        console.log(`⏳ Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);