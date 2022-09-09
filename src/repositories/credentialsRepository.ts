import { Credential } from "@prisma/client";
import client from "../database/prisma";
import { IInsertCredential } from "../interfaces/credentialInterface";




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
}
export async function insertData (credential: IInsertCredential){
    const response : Credential | null = await client.credential.create({
        data: credential
    });
    console.log(response)
};

export async function searchById(id:string){
  const response: Credential | null = await client.credential.findFirst({
    where:{
        id: id,
    }
  });
  return response
};

export async function searchAll(userId: string){
    const response : {id:string, title: string}[] | null= await client.credential.findMany({
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
    const response = await client.credential.delete({
        where:{
            id: id
        }
    });
    console.log(response);
};
