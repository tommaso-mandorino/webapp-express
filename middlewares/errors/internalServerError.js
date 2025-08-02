function internalServerError(error, request, response, next) {

    response.status(500).json(
        {
            error: true,
            errorCode: 500,
            errorMessage: 'Internal Server Error'
        }
    );

}

export default internalServerError;