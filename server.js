import express from 'express';
import mysql2 from 'mysql2';



const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = process.env.SERVER_PORT;



const server = express();



const mysqlConnectionInformation = {
    user: 'root',
    password: 'root',
    database: 'webapp-express'
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

server.get('/api/',
    
    (request, response) => {

        console.log(`➕ New request on 'index' route from IP: ${request.ip}.`)

        const indexQuery = 'SELECT * FROM `movies`';

        mysqlConnection.query(indexQuery,
            
            (error, result) => {

                response.json(result);

            }

        )

    }

)



server.listen(SERVER_PORT,

    () => {

        console.log(`⏳ Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);