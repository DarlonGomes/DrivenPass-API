import { User } from "@prisma/client";
import { Request, Response } from "express";
import { ISignIn, ISignUp } from "../interfaces/usersInterface";
import * as userService from "../services/usersService";
import { CategoryCount, TokenConfig } from "../types/usersTypes";


export async function signUp(req: Request, res: Response){
    const request : ISignUp = req.body;
    await userService.doesPasswordMatch(request.password, request.confirmPassword!);
    await userService.checkEmail(request.email, "sign-up");
    await userService.archiveAccount(request);
    return res.status(201).json({message: `Succesfull. Your account has been created`});
};

export async function signIn(req: Request, res: Response){
    const request: ISignIn = req.body;
    const account : User | undefined = await userService.checkEmail(request.email, "sign-in");
    await userService.comparePassword(request.password, account!.password)
    const config = await userService.generateToken(account!.id);
    return res.status(200).send({message: `Success. You will be redirected to the home page`, config: config})
};

export async function sumOfEachType(_req: Request, res: Response){
    const {userId} = res.locals.userId;
    const response : CategoryCount = await userService.handleEachSum(userId);
    return res.status(200).send(response)
}
