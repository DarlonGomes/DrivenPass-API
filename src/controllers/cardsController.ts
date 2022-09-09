import {Request, Response} from "express";
import { ICardRequest } from "../interfaces/cardInterface";
import * as cardService from "../services/cardsService"

export async function allTitles (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const response = await cardService.getAllCardTitles(userId);
    return res.status(200).send(response)
};
export async function InfoById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    const response = await cardService.getDataById(userId, id);
    return res.status(200).send(response);
};
export async function newCard (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const request : ICardRequest = req.body;
    await cardService.validateTitle(request.title, userId);
    await cardService.createCard(request, userId);
    return res.status(201).send("Succesfull");
};
export async function deleteById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    await cardService.deleteDataById(userId, id);
    return res.status(204).send("Succesfull");
};
