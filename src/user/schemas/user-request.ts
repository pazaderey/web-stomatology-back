import { Schema, model, Types } from "mongoose";
import { DetectionReportModel } from "../../detection";

const UserRequestSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
        date: {
            type: Date,
            required: true,
        },
        image: {
            type: Buffer,
            contentType: String,
            required: true,
        },
        detection_report: {
            type: Types.ObjectId,
            ref: "DetectionReport",
        },
    },
    {
        methods: {
            async toUserRequest(): Promise<UserRequest> {
                const detectionReport = await DetectionReportModel.findById(
                    this.detection_report?.prototype,
                );
                return {
                    date: this.date,
                    requestImage: this.image.toString("base64"),
                    detectionReportImage: detectionReport
                        ? detectionReport.response_image.toString("base64")
                        : undefined,
                };
            },
        },
    },
);

export const UserRequestModel = model("UserRequest", UserRequestSchema);

export interface UserRequest {
    date: Date;
    requestImage: string;
    detectionReportImage?: string;
}
