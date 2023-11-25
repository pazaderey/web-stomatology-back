import {
    Route,
    Post,
    Controller,
    Security,
    OperationId,
    Response,
    UploadedFile,
} from "tsoa";
import DetectionService from "./detection-service";
import { DetectionReport } from "./detection-report";

/**
 *
 */
@Route("detection")
export class DetectionController extends Controller {
    /**
     *
     */
    private readonly service = new DetectionService();

    /**
     * @summary Get detection report
     * @returns Detection report
     */
    @Response(200, "OK")
    @OperationId("detect")
    @Security("jwt")
    @Post()
    async detect(
        @UploadedFile("detect-image") file: Express.Multer.File,
    ): Promise<DetectionReport> {
        console.log(file.size);
        return this.service.getReport();
    }
}
