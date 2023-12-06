import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const ReviewModel = model("Review", ReviewSchema);

export interface Review {
    name: string;
    job: string;
    text: string;
}

export interface CreateReview extends Review {
    email: string;
}
