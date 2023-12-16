import { DetectionReport } from "./detection-report";
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
    private readonly aiService = {
        processImage(image: Buffer) {
            return new Promise<string>((resolve) => {
                setTimeout(
                    () => resolve("Image size is: " + image.byteLength),
                    3000,
                );
            });
        },
    };

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
        console.log(file.size, login);

        const report = await this.aiService.processImage(file.buffer);
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
}
