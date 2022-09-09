import { Card } from "@prisma/client";
import client from "../database/prisma";
import { IInsertCard } from "../interfaces/cardInterface";

export async function cardTitles (userId: string){
    const list : {id:string, title: string}[]= await client.card.findMany({
        where:{
            userId: userId
        },
        select:{
            id: true,
            title: true
        }
    });
    return list;
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
    const response : Card | null  = await client.card.create({
        data: data
    });
    console.log(response);
};
export async function deleteById(id: string){
    const response : Card | null = await client.card.delete({
        where:{
            id: id
        }
    });
    console.log(response);
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
}