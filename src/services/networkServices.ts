import { Network } from "@prisma/client";
import * as networkRepository from "../repositories/networkRepository";
import { ErrorInfo } from "../middlewares/errorMiddleware";
import { TitlesList } from "../types/usersTypes";
import * as userValidator from "../utils/validators/usersValidators";
import { securityUtils } from "../utils/handlers/securityHandlers";
import { IInsertNetwork, INetworkRequest } from "../interfaces/networkInterface";

export async function getAllCredentials (userId: string){
    const response: TitlesList | null = await networkRepository.networkTitles(userId);
    return response;
};

export async function getCredentialById (userId: string, id: string){
    const network : Network = await ensureNetworkExists(id);
    await userValidator.checkIfBelongsToUser(userId, network);
    const decryptedNetwork = securityUtils.decryptObjectPassword(network);
    return decryptedNetwork;
};

export async function createNetwork(request: INetworkRequest, userId: string){
    const network : IInsertNetwork = {...request, userId};
    const encryptedNetwork = await securityUtils.encryptObjectPassword(network);
    await networkRepository.insertData(encryptedNetwork as IInsertNetwork);
};

export async function validateTitle(title: string, userId: string){
    const validation : Network | null = await networkRepository.checkThisTitle(title, userId)
    if(validation) throw new ErrorInfo("error_conflict", "You already have a title like this")
};

export async function deleteNetworkById(userId:string, id: string){
    const network: Network= await ensureNetworkExists(id);
    await userValidator.checkIfBelongsToUser(userId, network);
    await networkRepository.deleteById(id);
};

async function ensureNetworkExists(id: string){
    const network: Network | null = await networkRepository.searchById(id);
    if(!network) throw new ErrorInfo("error_not_found", "This network doesn't exists");
    return network;
};