import { SecureNote } from "@prisma/client";
import {Request, Response} from "express";
import { INoteRequest } from "../interfaces/noteInterface";
import * as noteService from "../services/notesService";
import { TitlesList } from "../types/usersTypes";

export async function allTitles (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const response : TitlesList | null = await noteService.getAllNotes(userId);
    return res.status(200).send(response);
};
export async function InfoById (req: Request, res: Response){
    const {userId} = res.locals.userId
    const {id} = req.params;
    const response: SecureNote = await noteService.getNoteById(userId, id);
    return res.status(200).send(response);
};
export async function newNote (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const request : INoteRequest = req.body;
    await noteService.validateTitle(request.title, userId);
    await noteService.createNote(request, userId);
    return res.status(201).send("Succesfull");
};
export async function deleteById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    await noteService.deleteNoteById(userId, id);
    return res.status(204).send("Succesfull");
};
