import { Card } from "@prisma/client";

export interface ICardRequest extends Omit<Card, "id"|"created_at"| "userId">{
};

export interface IInsertCard extends ICardRequest{
    userId: string
}