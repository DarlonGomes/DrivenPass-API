import {Request, Response} from "express";
import { INetworkRequest } from "../interfaces/networkInterface";
import * as networkService from "../services/networkServices";
import { DecryptDataObject } from "../types/usersTypes";

export async function allTitles (req: Request, res: Response){
    const {userId} = res.locals.userId
    const response = await networkService.getAllCredentials(userId);
    return res.status(200).send(response);
};
export async function InfoById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    const response: DecryptDataObject = await networkService.getCredentialById(userId, id)
    return res.status(200).send(response);
};
export async function newNetwork (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const request : INetworkRequest = req.body;
    await networkService.createNetwork(request, userId);
    return res.status(201).send("Sucessfull")
};
export async function deleteById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    await networkService.deleteNetworkById(userId, id);
    return res.status(204).send("Sucessfull");
};
