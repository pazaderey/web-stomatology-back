import { Schema, model, Types } from "mongoose";
import { compressImage } from "../../detection";

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
        detection_report_image: {
            type: Buffer,
            contentType: String,
        },
    },
    {
        statics: {
            encode(r: UserRequest): UserRequestEncoded {
                return {
                    date: r.date,
                    requestImage: r.requestImage.toString("base64"),
                    detectionReportImage: r.detectionReportImage
                        ? r.detectionReportImage.toString("base64")
                        : undefined,
                };
            },
        },

        methods: {
            /**
             *
             * @returns
             */
            async toUserRequest(compress: boolean): Promise<UserRequest> {
                let compressedRequest: Buffer;
                if (compress) {
                    compressedRequest = await compressImage(this.image);
                } else {
                    compressedRequest = this.image;
                }

                let compressedResult: Buffer | undefined;
                if (!this.detection_report_image) {
                    compressedResult = undefined;
                } else {
                    compressedResult = compress
                        ? await compressImage(this.detection_report_image)
                        : this.detection_report_image;
                }

                return {
                    date: this.date,
                    requestImage: compressedRequest,
                    detectionReportImage: compressedResult,
                };
            },
        },
    },
);

export const UserRequestModel = model("UserRequest", UserRequestSchema);

export interface UserRequest {
    date: Date;
    requestImage: Buffer;
    detectionReportImage?: Buffer;
}

export type UserRequestEncoded = {
    [K in keyof UserRequest]: Buffer extends UserRequest[K]
        ? string
        : UserRequest[K];
};
