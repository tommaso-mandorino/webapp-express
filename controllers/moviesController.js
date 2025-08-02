import mysqlConnection from "../database/connection.js";



function index(request, response) {

    console.log(`➕ New request on 'index' route from IP: ${request.ip}.`)

    mysqlConnection.query(
        
        'SELECT * FROM `movies`;',
        
        (error, result) => {

            response.json(result);

        }

    )

}



function show(request, response) {

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



export default {
    index,
    show
};