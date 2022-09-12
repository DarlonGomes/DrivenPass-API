import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { ErrorInfo } from "./errorMiddleware";

export async function authenticateToken (req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token : string | undefined = authorization?.replace('Bearer ', '');
    console.log(token)
    if(!token) throw new ErrorInfo("error_unauthorized", "This request doesn't have any token");
    jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, id) => {
        if(err) throw new ErrorInfo("error_unauthorized", "This request doesn't have a valid token");
        res.locals.userId = id;
        next();
    });
};