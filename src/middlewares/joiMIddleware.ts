import { noteSchema } from "../schemas/noteSchema";
import { cardSchema } from "../schemas/cardSchema";
import { signInSchema, signUpSchema } from "../schemas/usersSchema";
import { networkSchema } from "../schemas/networkSchema";
import { credentialSchema } from "../schemas/credentialSchema";
import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorMiddleware";

export const joiValidation = {
    signUp: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = signUpSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    signIn: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = signInSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createCard: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = cardSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createCredential:(req: Request, _res:Response, next: NextFunction) =>{
        const request = req.body;
        const validation = credentialSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createNetwork:(req: Request, _res:Response, next: NextFunction) =>{
        const request = req.body;
        const validation = networkSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createNote:(req: Request, _res:Response, next: NextFunction) =>{
        const request = req.body;
        const validation = noteSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
}