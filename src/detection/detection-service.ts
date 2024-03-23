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
    private readonly requestUrl = `http://${process.env.DETECTION_HOST}:${process.env.DETECTION_PORT}/detect-service`;

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
    ): Promise<Buffer | null> {
        const request = new UserRequestModel({
            date: new Date(),
            image: file.buffer,
        });

        const fileBytes = new Uint8Array(file.buffer);
        const responseBuffer = await this.sendRequest(fileBytes);

        if (responseBuffer === null) {
            await request.save();
            return null;
        }

        const nodeBuffer = Buffer.from(responseBuffer);

        request.set("detection_report_image", nodeBuffer);

        if (login === undefined) {
            await request.save();
            return nodeBuffer;
        }

        const user = await this.userService.getUserByLogin(login);
        if (user !== null) {
            request.set("user", user);
            await request.save();
        }
        return nodeBuffer;
    }

    /**
     *
     * @param login
     * @param date
     */
    async getOriginal(login: string, date: string) {
        const user = await this.userService.getUserByLogin(login);
        if (user === null) {
            return null;
        }

        const userRequests = await this.userService.getUserRequests(
            user,
            false,
        );

        if (userRequests.length < 1) {
            return null;
        }

        const foundRequest = userRequests.find(
            (r) => r.date.toLocaleString() === date,
        );

        if (
            foundRequest === undefined ||
            foundRequest.detectionReportImage === undefined
        ) {
            return null;
        }

        return foundRequest.detectionReportImage;
    }

    /**
     *
     * @param data
     * @returns
     */
    private async sendRequest(data: Uint8Array): Promise<ArrayBuffer | null> {
        const request = await fetch(this.requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "image/png",
                "Content-Length": data.byteLength.toString(10),
            },
            body: data.buffer,
        }).catch((err) => {
            console.error("Detecting went wrong: " + err);
            return null;
        });

        return request ? request.arrayBuffer() : null;
    }
}
