import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const ArticleModel = model("Article", ArticleSchema);

export interface Article {
    date: string;
    title: string;
    authors: string;
    text: string;
}
