import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        enum: ["m", "f"],
    },
    email: {
        type: String,
        required: true,
        match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: {
        type: String,
        required: true,
        match: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const UserModel = model("User", UserSchema);

export interface User {
    name: string;
    sex: "m" | "f";
    email: string;
    phone: string;
    login: string;
    password: string;
}

export type UserInfo = Pick<User, "login"> &
    Partial<Omit<User, "password" | "requests">>;
