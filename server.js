import express from 'express';
import mysql2 from 'mysql2';



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



server.get('/api/',
    
    (request, response) => {

        console.log(`➕ New request on 'index' route from IP: ${request.ip}.`)

        mysqlConnection.query(
            
            'SELECT * FROM `movies`;',
            
            (error, result) => {

                response.json(result);

            }

        )

    }

)



server.get('/api/:id',

    (request, response) => {

        console.log(`➕ New request on 'show' route for resource with ID '${request.params.id}' from IP: ${request.ip}.`)

        mysqlConnection.query(
            
            'SELECT * FROM `movies` WHERE `movies`.`id` = ?;',
            
            [request.params.id],

            (error, movie) => {

                mysqlConnection.query(

                    'SELECT * FROM `reviews` WHERE `reviews`.`movie_id` = ?;',

                    [request.params.id],

                    (error, reviews) => {

                        movie[0].reviews = reviews;

                        response.json(movie[0]);

                    }

                )

            }

        )

    }

)



server.listen(SERVER_PORT,

    () => {

        console.log(`⏳ Server is listening on ${SERVER_ADDRESS}:${SERVER_PORT}...`);

    }

);