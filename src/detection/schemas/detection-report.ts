import { Schema, model } from "mongoose";

const DetectionReportSchema = new Schema({
    responseImage: {
        type: Buffer,
        contentType: String,
    },
});

export const DetectionReportModel = model(
    "DetectionReport",
    DetectionReportSchema,
);

export interface DetectionReport {
    responseImage: Buffer;
}
