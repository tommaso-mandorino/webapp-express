function routeNotFound(request, response, next) {

    response.status(404).json(
        {
            error: true,
            errorCode: 404,
            errorMessage: 'Error 404: route not found.'
        }
    );

}

export default routeNotFound;