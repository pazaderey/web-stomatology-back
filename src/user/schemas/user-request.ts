import { Schema, model, Types } from "mongoose";
import { User } from "./user";

const UserRequestSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    img: {
        type: Types.Buffer,
        contentType: String,
    },
});

export const UserRequestModel = model("UserRequest", UserRequestSchema);

export interface UserRequest {
    user: User;
    date: Date;
    text: string;
    img: string;
}
