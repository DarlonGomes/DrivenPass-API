import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export type ErrorType = 
    | "error_bad_request"
    | "error_unauthorized"
    | "error_forbidden"
    | "error_not_found"
    | "error_conflict"
    | "error_unprocessable_entity"
    | "error_internal_server_error";


interface ErrorObject extends ErrorRequestHandler {
    type: ErrorType
    message: string;
  }

interface ErrorInterface { 
    [errorType : string] : {status : number}
}

export async function errorHandler(error: ErrorObject, _req: Request, res: Response, _next: NextFunction){
    const {type, message} = error;
  console.log(error)
    const Errors: ErrorInterface = {
        error_bad_request: {
          status: 400,
        },
        error_unauthorized: {
          status: 401,
        },
        error_forbidden: {
          status: 403,
        },
        error_not_found: {
          status: 404,
        },
        error_conflict: {
          status: 409,
        },
        error_unprocessable_entity: {
          status: 422,
        },
        error_internal_server_error: {
          status: 500,
        },
      };
    if(Errors[type]?.status){
        const {status} = Errors[type];
        return res.status(status).send(message);
    }

    return res.sendStatus(500);
}

export class ErrorInfo {
  type: ErrorType;
  message: string;
  constructor(errorType: ErrorType, message: string){
    this.type = errorType;
    this.message = message;
  }
}
