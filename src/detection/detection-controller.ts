import { Route, Post, Controller, Security, OperationId } from "tsoa";
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
    @OperationId("detect")
    @Security("jwt")
    @Post()
    async detect(): Promise<DetectionReport> {
        return this.service.getReport();
    }
}
