
import { User, Credential, Card, Network } from "@prisma/client";
import { IInsertCard } from "./cardInterface";
import { IInsertCredential } from "./credentialInterface";

export interface ISignIn extends Omit<User, "id"|"created_at"> {

}

export interface ISignUp extends Omit<User, "id"|"created_at"> {
    confirmPassword?: string
}

export type DecryptDataObject = | Card | Credential | Network

export type EncryptDataObject = | IInsertCredential | IInsertCard