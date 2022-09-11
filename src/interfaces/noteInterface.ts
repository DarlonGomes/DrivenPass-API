import { SecureNote } from "@prisma/client";

export interface INoteRequest extends Omit<SecureNote, "id"|"created_at"|"userId">{
};

export interface IInsertNote extends INoteRequest{
    userId: string
}
