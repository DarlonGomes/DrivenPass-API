import { Credential, Card, Network } from "@prisma/client";
import { IInsertCard } from "../interfaces/cardInterface";
import { IInsertCredential } from "../interfaces/credentialInterface";
import { IInsertNetwork } from "../interfaces/networkInterface";

export type DecryptDataObject = | Card | Credential | Network

export type EncryptDataObject = | IInsertCredential | IInsertCard | IInsertNetwork

export type TitlesList = { id: string; title: string; }[]

export type TokenConfig = { headers : {
    Authorization : string
}};

export type CategoryCount = {title: string, quantity: number}[]