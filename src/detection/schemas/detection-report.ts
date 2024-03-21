import { Schema, model } from "mongoose";

const DetectionReportSchema = new Schema(
    {
        response_image: {
            type: Buffer,
            contentType: String,
            required: true,
        },
    },
    {
        methods: {
            toDetectionReport(): DetectionReport {
                return {
                    responseImage: this.response_image,
                };
            },
        },
    },
);

export const DetectionReportModel = model(
    "DetectionReport",
    DetectionReportSchema,
);

export interface DetectionReport {
    responseImage: Buffer;
}
