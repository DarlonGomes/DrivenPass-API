import client from "../database/prisma";
import { Network } from "@prisma/client";
import { IInsertNetwork } from "../interfaces/networkInterface";
import { TitlesList } from "../types/usersTypes";


export async function insertData (data: IInsertNetwork){
    await client.network.create({
        data: data
    });
};

export async function networkTitles (userId: string){
    const response : TitlesList | null = await client.network.findMany({
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
    const response :Network | null = await client.network.findFirst({
        where:{
            id: id
        }
    });
    return response;
    
};

export async function deleteById(id: string){
    await client.network.delete({
        where:{
            id: id
        }
    });
};

