import { ISignUp } from "../interfaces/usersInterface";
import { ErrorInfo } from "../middlewares/errorMiddleware"
import * as userRepository from "../repositories/usersRepository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CategoryCount, TokenConfig } from "../types/usersTypes";
import { User } from "@prisma/client";
import { credentialTitles } from "../repositories/credentialsRepository";
import { cardTitles } from "../repositories/cardsRepository";
import { networkTitles } from "../repositories/networkRepository";
import { noteTitles } from "../repositories/notesRepository";


export async function checkEmail (email: string, method: "sign-in" | "sign-up" ) : Promise<User | undefined>{
    const account : User | null = await userRepository.checkData(email);
    if(method === "sign-up" && account)throw new ErrorInfo("error_conflict", "An account with this email already exists")
    if(method === "sign-in"){
        if(!account)throw new ErrorInfo("error_not_found", "This account doesn't exist")
        return account
    }
}

export async function doesPasswordMatch(password: string, confirmPassword: string){
    if(password !== confirmPassword) throw new ErrorInfo("error_conflict", "Your passwords do not match")
};


export async function archiveAccount (account: ISignUp) : Promise<User>{
    delete account.confirmPassword
    const accountWithHashedPassword : ISignUp = await hashUserPassword(account);
    const response : User = await userRepository.create(accountWithHashedPassword);
    return response;
};

async function hashUserPassword (account: ISignUp) : Promise<ISignUp>{
    const hashPassword : string = bcrypt.hashSync(account.password, 10);
    account.password = hashPassword
    return account
};

export async function comparePassword (password: string, hashPassword:string){
    const isPasswordValid : boolean = bcrypt.compareSync(password, hashPassword);
    if(!isPasswordValid) throw new ErrorInfo("error_conflict", "Incorrect password")
};

export async function generateToken(id: string) {
    const token : string = jwt.sign({userId: id}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "1d"})
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config
};

export async function handleEachSum ( userId: string) : Promise<CategoryCount>{
 const credentials  = await credentialTitles(userId);
 const cards  = await cardTitles(userId);
 const networks  = await networkTitles(userId);
 const notes  = await noteTitles(userId);
 return [
    {title: "Credentials", quantity: credentials.length},
    {title: "Safe Notes", quantity: notes.length},
    {title: "Cards", quantity: cards.length},
    {title: "WiFi Passwords", quantity: networks.length},
]
}