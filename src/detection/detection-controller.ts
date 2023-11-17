import { Route, Post, Controller } from "tsoa";
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
     *
     * @returns
     */
    @Post()
    async detect(): Promise<DetectionReport> {
        return this.service.getReport();
    }
}
