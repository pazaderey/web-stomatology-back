import {
    Route,
    Post,
    Controller,
    OperationId,
    Response,
    UploadedFile,
    FormField,
} from "tsoa";
import DetectionService from "./detection-service";
import { DetectionReport } from "./schemas/detection-report";

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
        @FormField("user-login") userLogin?: string,
    ): Promise<DetectionReport> {
        try {
            const report = await this.service.getReport(file, userLogin);
            if (report === null) {
                this.setStatus(500);
                throw new Error("Detection went wrong");
            }
            return report;
        } catch (err) {
            this.setStatus(500);
            throw new Error("Something went wrong: " + err);
        }
    }
}
