import { noteSchema } from "../schemas/noteSchema";
import { cardSchema } from "../schemas/cardSchema";
import { signInSchema, signUpSchema } from "../schemas/usersSchema";
import { networkSchema } from "../schemas/networkSchema";
import { credentialSchema } from "../schemas/credentialSchema";
import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorMiddleware";

export const joiValidation = {
    signUp: (_req: Request, res:Response, next: NextFunction) => {
        const request = res.locals.strippedRequestBody;
        const validation = signUpSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    signIn: (_req: Request, res:Response, next: NextFunction) => {
        const request = res.locals.strippedRequestBody;
        const validation = signInSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createCard: (_req: Request, res:Response, next: NextFunction) => {

    }
}