import {
    Route,
    Post,
    Controller,
    OperationId,
    Response,
    UploadedFile,
    FormField,
    Request,
} from "tsoa";
import { Request as ExRequest } from "express";
import DetectionService from "./detection-service";

/**
 *
 */
@Route("detection")
export class DetectionController extends Controller {
    /**
     *
     */
    private readonly service = DetectionService.getInstance();

    /**
     * @summary Get detection report
     * @returns Detection report
     */
    @Response(200, "OK")
    @OperationId("detect")
    @Post()
    async detect(
        @UploadedFile("detect-image") file: Express.Multer.File,
        @Request() request: ExRequest,
        @FormField("user-login") userLogin?: string,
    ) {
        try {
            const report = await this.service.getReport(file, userLogin);
            if (report === null) {
                this.setStatus(500);
                throw new Error("Detection went wrong");
            }
            const realBuffer = new Uint8Array(report.responseImage).buffer;
            request.res
                ?.setHeader("content-length", realBuffer.byteLength)
                ?.setHeader("content-type", "image/png")
                ?.send(realBuffer);
        } catch (err) {
            this.setStatus(500);
            throw new Error("Something went wrong: " + err);
        }
    }
}
