import { Schema, model, Types } from "mongoose";
import { User } from "./user";
import { DetectionReport } from "src/detection";

const UserRequestSchema = new Schema({
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
});

export const UserRequestModel = model("UserRequest", UserRequestSchema);

export interface UserRequest {
    user: User;
    date: Date;
    requestImage: Buffer;
    detectionReport: DetectionReport;
}
