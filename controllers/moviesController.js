import mysqlConnection from "../database/databaseConnection.js";

const throwQueryInternalServerError = (request, response) => {

    console.log('🚨 Last request triggered a query Internal Server Error.');

    response.status(500).json({
            error: true,
            errorCode: 500,
            errorMessage: 'Internal Server Error'
        }
    );
}

const throwIdNotFoundError = (request, response) => {

    console.log(`⚠️ Last request was on not-existent ID.`);

    response.status(404).json({
            error: true,
            errorCode: 404,
            errorMessage: `Movie with ID '${request.params.id}' not Found.`
        }
    );
}

function index(request, response) {

    console.log(`📋 New request on 'index' route from IP: ${request.ip}.`);

    mysqlConnection.query('SELECT * FROM `movies`;', (error, moviesArray) => {

            if(error) {
                return throwQueryInternalServerError(request, response);
            }

            response.json(moviesArray);
        }
    )
}

function show(request, response) {

    console.log(`👉 New request on 'show' route for resource with ID '${request.params.id}' from IP: ${request.ip}.`);

    mysqlConnection.query('SELECT * FROM `movies` WHERE `movies`.`id` = ?;', [request.params.id], (error, singleMovieInArray) => {

        if(error) {
            return throwQueryInternalServerError(request, response);
        }

        if(!singleMovieInArray.length) {
            return throwIdNotFoundError(request, response);
        }

        mysqlConnection.query('SELECT * FROM `reviews` WHERE `reviews`.`movie_id` = ?;', [request.params.id], (error, reviewsArray) => {

            if(error) {
                return throwQueryInternalServerError(request, response);
            }

            singleMovieInArray[0].reviews = reviewsArray;

            response.json(singleMovieInArray[0]);
        });
    });
}

export default { index, show };