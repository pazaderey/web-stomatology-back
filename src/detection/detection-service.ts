import { DetectionReport } from "./detection-report";
import { UserRequestModel, UserService } from "../user";
import http from "node:http";

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
        const report = await this.sendRequest(file);
        if (login === undefined) {
            return {
                text: report,
            };
        }

        const user = await this.userService.getUserByLogin(login);
        if (user !== null) {
            const request = new UserRequestModel({
                user,
                date: new Date(),
                text: report,
                img: file.buffer,
            });

            await request.save();
        }
        return {
            text: report,
        };
    }

    /**
     *
     * @param data
     * @returns
     */
    private async sendRequest(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = http.request(
                {
                    host: process.env.DETECTION_HOST,
                    port: process.env.DETECTION_PORT,
                    path: "/detect-service",
                    method: "GET",
                },
                (response) => {
                    response.on("end", () => {
                        resolve();
                    });

                    response.on("error", () => {
                        reject();
                    });
                },
            );
            request.write(data);
            request.end();
        });
    }
}
