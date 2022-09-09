import client from "../database/prisma";
import { ISignUp } from "../interfaces/usersInterface";

export async function create (account: ISignUp){
    const response = await client.user.create({
        data: account
    });
    return response
}

export async function checkData (email: string){
    const account = await client.user.findUnique({
        where:{
            email: email
        }
    });
    return account
}



