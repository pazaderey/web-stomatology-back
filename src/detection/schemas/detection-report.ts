import { Schema, model } from "mongoose";

const DetectionReportSchema = new Schema({
    response_image: {
        type: Buffer,
        contentType: String,
        required: true,
    },
});

export const DetectionReportModel = model(
    "DetectionReport",
    DetectionReportSchema,
);

export interface DetectionReport {
    responseImage: Buffer;
}
