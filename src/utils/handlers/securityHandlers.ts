
import { encryptUtils } from "../encryptUtils";
import { DecryptDataObject, EncryptDataObject } from "../../interfaces/usersInterface";
import { IInsertCard } from "../../interfaces/cardInterface";

export const securityUtils = {
    decryptObjectPassword: async (data: DecryptDataObject) => {
        data.password = encryptUtils.decryptData(data.password!);
        
        return data
    },
    encryptObjectPassword: async (data: EncryptDataObject) => {
        data.password = encryptUtils.encryptData(data.password!);
        return data
    },
    encryptCVV : async (data : IInsertCard) => {
        data.securityCode = encryptUtils.encryptData(data.securityCode);
        return data
    }
}