import { Card } from "@prisma/client";
import client from "../database/prisma";
import { IInsertCard } from "../interfaces/cardInterface";
import { TitlesList } from "../types/usersTypes";


export async function cardTitles (userId: string){
    const response : TitlesList | null = await client.card.findMany({
        where:{
            userId: userId
        },
        select:{
            id: true,
            title: true
        }
    });
    return response;
};
export async function searchById(id: string){
    const response : Card | null = await client.card.findFirst({
        where:{
            id: id
        }
    });
    return response;
};
export async function insertData (data: IInsertCard){
    await client.card.create({
        data: data
    });
};
export async function deleteById(id: string){
    await client.card.delete({
        where:{
            id: id
        }
    });
};
export async function validateTitle(title:string, userId:string){
    const response : Card | null = await client.card.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    });
    return response
};
export async function cardsCount(userId: string){
    const count : number = await client.card.count({
        where:{
            userId: userId
        }
    });
    return count
}