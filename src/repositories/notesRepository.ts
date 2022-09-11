import { SecureNote } from "@prisma/client";
import client from "../database/prisma";
import { IInsertNote } from "../interfaces/noteInterface";
import { TitlesList } from "../types/usersTypes";


export async function noteTitles (userId: string){
    const response : TitlesList | null = await client.secureNote.findMany({
        where:{
            userId: userId
        },
        select:{
            title: true,
            id: true
        }
    });
    return response
};
export async function searchById(id:string){
    const response :SecureNote | null = await client.secureNote.findFirst({
        where:{
            id: id
        }
    });
    return response;
    
};
export async function insertData (data: IInsertNote){
    await client.secureNote.create({
        data: data
    });
};

export async function deleteById(id: string){
    await client.secureNote.delete({
        where:{
            id: id
        }
    });
};

export async function checkThisTitle(title:string, userId: string){
    const response : SecureNote | null = await client.secureNote.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    });
    return response
};

export async function notesCount(userId: string){
    const count : number = await client.secureNote.count({
        where:{
            userId: userId
        }
    });
    return count
};
