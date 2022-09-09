import { Request, Response } from "express";
import { ISignIn, ISignUp } from "../interfaces/usersInterface";
import * as userService from "../services/usersService";


export async function signUp(_req: Request, res: Response){
    const request : ISignUp= res.locals.strippedRequestBody;
    await userService.doesPasswordMatch(request.password, request.confirmPassword);
    await userService.checkEmail(request.email, "sign-up");
    const response = await userService.archiveAccount(request);
    return res.status(201).json({message: `Succesfull. Your account has been created`, response: response});
}

export async function signIn(_req: Request, res: Response){
    const request: ISignIn = res.locals.strippedRequestBody;
    const account = await userService.checkEmail(request.email, "sign-in");
    await userService.comparePassword(request.password, account!.password)
    const config = await userService.generateToken(account!.id);
    return res.status(200).json({message: `Success. You will be redirected to the home page`, config})
}

