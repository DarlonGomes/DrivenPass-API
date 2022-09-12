import { Credential } from "@prisma/client";
import client from "../database/prisma";
import { IInsertCredential } from "../interfaces/credentialInterface";
import { TitlesList } from "../types/usersTypes";


export async function checkThisTitle(title: string, userId:string){
    const response: Credential | null = await client.credential.findUnique({
        where:{
            userId_title: {
                userId: userId,
                title: title
            }
        }
    });
    return response
};

export async function insertData (credential: IInsertCredential){
    await client.credential.create({
        data: credential
    });  
};

export async function searchById(id:string){
  const response: Credential | null = await client.credential.findFirst({
    where:{
        id: id,
    }
  });
  return response
};

export async function credentialTitles(userId: string){
    const response : TitlesList | null= await client.credential.findMany({
        where:{
            userId : userId
        }, 
        select:{
            id: true,
            title: true
        }
      });
      return response
};

export async function deleteById(id: string){
    await client.credential.delete({
        where:{
            id: id
        }
    });
};
