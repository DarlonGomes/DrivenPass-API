import { Card } from "@prisma/client";
import { ICardRequest, IInsertCard } from "../interfaces/cardInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware";
import * as cardRepository from "../repositories/cardsRepository";
import { securityUtils } from "../utils/handlers/securityHandlers";
import * as userValidator from "../utils/validators/usersValidators";

export async function getAllCardTitles (userId: string){
    const response : {id:string, title: string}[] | null = await cardRepository.cardTitles(userId);
    return response
};

export async function getDataById (userId: string, id: string){
    const card : Card = await ensureCardExists(id);
    await userValidator.checkIfBelongsToUser(userId, card);
    const decryptedCard = await securityUtils.decryptObjectPassword(card);
    return decryptedCard;
};

export async function createCard(data: ICardRequest, userId:string){
    const card : IInsertCard = { ...data, userId};
    const dataWithEncryptedPassword = await securityUtils.encryptObjectPassword(card);
    const encryptedCard = await securityUtils.encryptCVV(dataWithEncryptedPassword as IInsertCard);
    await cardRepository.insertData(encryptedCard);
};

export async function deleteDataById(userId: string, id: string){
    const card = await ensureCardExists(id);
    await userValidator.checkIfBelongsToUser(userId,card);
    await cardRepository.deleteById(id);
};

async function ensureCardExists(id: string){
    const card : Card | null = await cardRepository.searchById(id);
    if(!card) throw new ErrorInfo("error_not_found", "This card doesn't exists");
    return card
};

export async function validateTitle (title: string, userId: string){
    const validation = await cardRepository.validateTitle(title, userId);
    if(validation) throw new ErrorInfo("error_conflict", "This title already exists")

};
