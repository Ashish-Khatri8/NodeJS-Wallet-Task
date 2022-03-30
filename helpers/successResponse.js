const successResponse = (res, statusCode, message, data={}) => {
    res.status(statusCode || 200).json({
        "status": "success",
        "message": message,
        "data": data,
    });
};

export default successResponse;
