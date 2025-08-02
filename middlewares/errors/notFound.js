function routeNotFound(request, response, next) {

    response.status(404).json(
        {
            error: true,
            errorCode: 404,
            errorMessage: 'Not Found'
        }
    );

}

export default routeNotFound;