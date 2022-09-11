
import { User} from "@prisma/client";

export interface ISignIn extends Omit<User, "id"|"created_at"> {

};
export interface ISignUp extends Omit<User, "id"|"created_at"> {
    confirmPassword?: string
};

