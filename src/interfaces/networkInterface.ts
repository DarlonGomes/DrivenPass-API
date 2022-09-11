import { Network } from "@prisma/client";

export interface INetworkRequest extends Omit<Network, "id" | "created_at" | "userId" >{
};

export interface IInsertNetwork extends INetworkRequest{
    userId: string
}