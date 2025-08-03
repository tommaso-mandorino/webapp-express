function routeNotFound(request, response, next) {

    console.log(`⚠️ New request on not-existent route '${request.url}' from IP ${request.ip}.`);

    response.status(404).json(
        {
            error: true,
            errorCode: 404,
            errorMessage: 'Not Found'
        }
    );

}

function internalServerError(error, request, response, next) {

    console.log('🚨 Last request triggered an Internal Server Error.');

    response.status(500).json(
        {
            error: true,
            errorCode: 500,
            errorMessage: 'Internal Server Error'
        }
    );

}

export default {
    routeNotFound,
    internalServerError
};