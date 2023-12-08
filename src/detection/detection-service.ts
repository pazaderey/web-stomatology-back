import { DetectionReport } from "./detection-report";

/**
 *
 */
export default class DetectionService {
    /**
     *
     */
    private static instance?: DetectionService;

    /**
     *
     * @returns
     */
    public static getInstance(): DetectionService {
        if (DetectionService.instance === undefined) {
            DetectionService.instance = new DetectionService();
        }

        return DetectionService.instance;
    }
    /**
     *
     * @returns
     */
    async getReport(): Promise<DetectionReport> {
        return {};
    }
}
