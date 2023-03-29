export class HttpException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export class NotFoundException extends HttpException {
    constructor(message, statusCode = 404) {
        super("Not Found: " + message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export class BadRequestException extends HttpException {
    constructor(message, statusCode = 400) {
        super("Bad Request: " + message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export class InternalServerException extends HttpException {
    constructor(message, statusCode = 500) {
        super("Internal Server Error: " + message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
    }
}
