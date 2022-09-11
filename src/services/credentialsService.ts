import { Credential } from "@prisma/client";
import { ICredentialRequest, IInsertCredential } from "../interfaces/credentialInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware";
import * as credentialRepository from "../repositories/credentialsRepository";
import * as userValidator from "../utils/validators/usersValidators";
import { securityUtils } from "../utils/handlers/securityHandlers";
import { TitlesList } from "../types/usersTypes";

export async function getAllCredentials (userId: string){
    const response: TitlesList| null = await credentialRepository.credentialTitles(userId)
    return response
};

export async function getCredentialById (userId: string, id: string){
    const credential : Credential = await ensureCredentialExists(id);
    await userValidator.checkIfBelongsToUser(userId, credential);
    const decryptedCredential = securityUtils.decryptObjectPassword(credential);
    return decryptedCredential;
};

export async function createCredential(request: ICredentialRequest, userId: string){
    const credential : IInsertCredential = {...request, userId};
    const encryptedCredential = await securityUtils.encryptObjectPassword(credential);
    await credentialRepository.insertData(encryptedCredential as IInsertCredential);
};

export async function validateTitle(title: string, userId: string){
    const validation : Credential | null = await credentialRepository.checkThisTitle(title, userId)
    if(validation) throw new ErrorInfo("error_conflict", "You already have a title like this")
}

export async function deleteCredentialById(userId:string, id: string){
    const credential: Credential= await ensureCredentialExists(id);
    await userValidator.checkIfBelongsToUser(userId, credential);
    await credentialRepository.deleteById(id);
};

async function ensureCredentialExists(id: string){
    const credential: Credential | null = await credentialRepository.searchById(id);
    if(!credential) throw new ErrorInfo("error_not_found", "This credential doesn't exists");
    return credential;
};

