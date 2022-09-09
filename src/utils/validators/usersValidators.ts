import { Credential, Card, SecureNote, Network } from "@prisma/client";
import { ErrorInfo } from "../../middlewares/errorMiddleware";

export async function checkIfBelongsToUser (userId: string, object: | Credential | Card | Network| SecureNote){
    if(object.userId !== userId) throw new ErrorInfo("error_conflict", "This credential isn't yours");
}