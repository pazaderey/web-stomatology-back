import { User } from "../user";

export interface UserAuthentication {
    login: string;
    password: string;
}

export type CreateUser = UserAuthentication & Pick<User, "email">;
