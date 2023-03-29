export class HttpException extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}


export class NotFoundException extends HttpException{
  constructor(public message: string, public statusCode: number = 404) {
    super("Not Found: " + message, statusCode);
  }
}


export class BadRequestException extends HttpException{
  constructor(public message: string, public statusCode: number = 400) {
    super("Bad Request: " + message, statusCode);
  }
}

export class InternalServerException extends HttpException{
  constructor(public message: string, public statusCode: number = 500) {
    super("Internal Server Error: " + message, statusCode);
  }
}

