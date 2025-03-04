const errorMiddleware = (err, req, res, next) => {
    try {
        let error = new Error(err.message);
        error.statusCode = err.statusCode || 500;

        console.error(err);

        if (err.name === 'CastError') {
            error = new Error('Resource not found');
            error.statusCode = 404;
        }

        if (err.code === 11000) {
            error = new Error('Duplicate value entered');
            error.statusCode = 400;
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode).json({
            success: false,
            error: error.message || 'Server Error'
        });
    } catch (internalError) {
        next(internalError);
    }
};

export default errorMiddleware;
