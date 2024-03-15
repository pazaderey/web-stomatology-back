import { DetectionReport } from "./schemas/detection-report";
import { UserRequestModel, UserService } from "../user";

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
     */
    private static readonly requestUrl = new URL(process.env.DETECTION_HOST);

    static {
        DetectionService.requestUrl.port =
            process.env.DETECTION_PORT.toString(10);
    }

    /**
     *
     */
    private readonly userService = UserService.getInstance();

    /**
     *
     */
    private constructor() {}

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
    async getReport(
        file: Express.Multer.File,
        login?: string,
    ): Promise<DetectionReport> {
        const fileBytes = new Uint8Array(file.buffer);
        const responseBuffer = await this.sendRequest(fileBytes);

        const detectionReport: DetectionReport = {
            responseImage: Buffer.from(responseBuffer),
        };

        if (login === undefined) {
            return detectionReport;
        }

        const user = await this.userService.getUserByLogin(login);
        if (user !== null) {
            const request = new UserRequestModel({
                user,
                date: new Date(),
                requestImage: file.buffer,
                detectionReport,
            });

            await request.save();
        }
        return detectionReport;
    }

    /**
     *
     * @param data
     * @returns
     */
    private async sendRequest(data: Uint8Array): Promise<ArrayBuffer> {
        const request = await fetch(DetectionService.requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "image/png",
                "Content-Length": data.byteLength.toString(10),
            },
            body: data.buffer,
        });

        return request.arrayBuffer();
    }
}
