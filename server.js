import express from 'express';
import mysql2 from 'mysql2';

import moviesController from './controllers/moviesController.js';


const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = process.env.SERVER_PORT;



const server = express();

server.use(express.static('public'));



const mysqlConnectionInformation = {
    user: process.env.DBMS_USER,
    password: process.env.DBMS_PASSWORD,
    database: process.env.DBMS_USE
}

const mysqlConnection = new mysql2.createConnection(mysqlConnectionInformation);

if (!mysqlConnection)
    throw new Error('🚨 Unable to connect to the database.');
    
console.log('✅ Connected successfully to the database.');



server.get('/',

    (request, response) => {

        console.log(`➕ New request on 'root' route from IP: ${request.ip}.`);

        response.send('Welcome to the server!');

    }

);



server.get('/api/',    moviesController.index);
server.get('/api/:id', moviesController.show);



server.listen(SERVER_PORT,

    () => {

        console.log(`⏳ Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);