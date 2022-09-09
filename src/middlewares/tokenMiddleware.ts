import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { ErrorInfo } from "./errorMiddleware";
const SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function authenticateToken (req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token : string | undefined = authorization?.replace('Bearer ', '');
    if(!token) throw new ErrorInfo("error_unauthorized", "This request doesn't have any token");
    jwt.verify(token!, SECRET, (err, id) => {
        if(err) throw new ErrorInfo("error_unauthorized", "This request doesn't have a valid token");

        res.locals.userId = Number(id);
        next();
    });
};