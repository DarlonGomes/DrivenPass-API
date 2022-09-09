import { Credential } from "@prisma/client";

export interface IInsertCredential extends Omit<Credential, "id" | "created_at">{
};

export interface ICredentialRequest extends Omit<IInsertCredential, "userId">{
};

