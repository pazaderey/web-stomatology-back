import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as crypto from "node:crypto";
import { UserRequestEncoded } from "./user-request";

const UserSchema = new Schema(
    {
        name: { type: String },
        sex: { type: String, enum: ["m", "f"] },
        email: { type: String },
        phone: { type: String },
        login: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        statics: {
            async generatePassword(
                password?: string,
            ): Promise<[password: string, hashed: string]> {
                let userPassword: string;
                if (password) {
                    userPassword = password;
                } else {
                    userPassword = crypto
                        .randomBytes(10)
                        .toString("hex")
                        .slice(0, 10);
                }
                const salt = await bcrypt.genSalt(8);
                const hashed = await bcrypt.hash(userPassword, salt);
                return [userPassword, hashed];
            },
        },
        methods: {
            toUserEntity(): UserEntity {
                return {
                    name: this.name,
                    sex: this.sex,
                    email: this.email,
                    phone: this.phone,
                    login: this.login,
                };
            },
        },
    },
);

export const UserModel = model("User", UserSchema);

export interface User {
    name?: string | null;
    sex?: "m" | "f" | null;
    email?: string | null;
    phone?: string | null;
    login: string;
    password: string;
}

export type UserEntity = Omit<User, "password">;

export type UserInfo = UserEntity & {
    userRequests: Array<UserRequestEncoded>;
};
