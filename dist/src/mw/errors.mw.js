import { NotFoundException } from '../exceptions/http.exceptions.js';
export default function errorWrapper(routingFunc) {
    return async function (req, res, next) {
        try {
            await routingFunc(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
}
export function NotFound(req, res, next) {
    next(new NotFoundException(`${req.url} is invalid url`));
}
export function ErrorResponse(err, req, res, next) {
    const response = {
        status: err.statusCode || 500,
        message: err.message
    };
    if (process.env.ENVIRONMENT === 'development') {
        response.stack = err.stack || 'No trace stack.';
    }
    next();
    res.status(response.status).json(response);
}
