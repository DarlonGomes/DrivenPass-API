import { SecureNote } from "@prisma/client";
import { IInsertNote, INoteRequest } from "../interfaces/noteInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware";
import * as noteRepository from "../repositories/notesRepository";
import * as userValidator from "../utils/validators/usersValidators";

export async function getAllNotes (userId: string){
    const titlesList = await noteRepository.noteTitles(userId);
    return titlesList
};

export async function getNoteById (userId: string, id:string){
    const note : SecureNote = await ensureNoteExists(id);
    await userValidator.checkIfBelongsToUser(userId, note);
    return note;
};

export async function createNote(request: INoteRequest, userId: string){
    const note : IInsertNote = {...request, userId};
    await noteRepository.insertData(note);
};
export async function validateTitle(title: string, userId: string){
    const validation : SecureNote | null = await noteRepository.checkThisTitle(title, userId);
    if(validation) throw new ErrorInfo("error_conflict", "You already have a title like this");

};
export async function deleteNoteById(userId: string, id: string){
    const note : SecureNote = await ensureNoteExists(id);
    await userValidator.checkIfBelongsToUser(userId, note);
    await noteRepository.deleteById(id);
};

async function ensureNoteExists(id: string){
    const note: SecureNote | null = await noteRepository.searchById(id);
    if(!note) throw new ErrorInfo("error_not_found", "This note doesn't exists");
    return note;
}