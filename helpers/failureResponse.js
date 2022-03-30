const failureResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        "status": "failure",
        "message": message,
    });
};

export default failureResponse;
