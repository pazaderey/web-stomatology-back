import {
    Route,
    Post,
    Controller,
    OperationId,
    Response,
    UploadedFile,
    Get,
    Query,
} from "tsoa";
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
        @Query("login") userLogin?: string,
    ) {
        try {
            const report = await this.service.getReport(file, userLogin);
            if (report === null) {
                this.setStatus(500);
                throw new Error("Detection went wrong");
            }

            this.setStatus(200);
            this.setHeader("content-type", "image/png");

            // TSOA не умеет отправлять буфферы, приходится кодировать
            // https://github.com/lukeautry/tsoa/issues/1128
            return report.toString("base64");
        } catch (err) {
            this.setStatus(500);
            throw new Error("Something went wrong: " + err);
        }
    }

    /**
     *
     * @param login
     * @param date
     */
    @Response(200, "OK")
    @OperationId("getFullImage")
    @Get()
    async getFullImage(
        @Query("login") login: string,
        @Query("date") date: string,
    ) {
        try {
            const original = await this.service.getOriginal(login, date);
            if (original === null) {
                this.setStatus(404);
                return;
            }
            this.setStatus(200);
            this.setHeader("content-type", "image/png");

            // TSOA не умеет отправлять буфферы, приходится кодировать
            // https://github.com/lukeautry/tsoa/issues/1128
            return original.toString("base64");
        } catch (err) {
            this.setStatus(500);
            throw new Error("Something went wrong: " + err);
        }
    }
}
