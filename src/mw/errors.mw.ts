import { Request, NextFunction, Response } from 'express';
import { HttpException } from '../exceptions/http.exceptions.js';
import { IErrorResponse } from '../types/errors.js';
import { AsyncReqHandler } from '../types/index.js';
import { RequestHandler } from 'express';
import { NotFoundException } from '../exceptions/http.exceptions.js';

export default function errorWrapper(routingFunc: AsyncReqHandler | RequestHandler):AsyncReqHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        await routingFunc(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
  

export function NotFound(req: Request, res: Response, next: NextFunction): void {
  next(new NotFoundException(`${req.url} is invalid url`));
}

export function ErrorResponse(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const response: IErrorResponse = {
    status: err.statusCode || 500,
    message: err.message
  };
  if(process.env.ENVIRONMENT === 'development'){
    response.stack = err.stack || 'No trace stack.'
  }

  next();
  res.status(response.status).json(response);
}