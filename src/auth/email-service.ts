import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export default class EmailService {
    /**
     *
     */
    private static instance?: EmailService;

    /**
     *
     */
    private readonly oAuthClient = new OAuth2Client({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
    });

    /**
     *
     */
    private constructor() {
        this.oAuthClient.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });
    }

    /**
     *
     * @returns
     */
    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }

        return EmailService.instance;
    }

    /**
     *
     */
    public async sendEmail(to: string, login: string, password: string) {
        const accessToken = (await this.oAuthClient.getAccessToken()).token;
        if (!accessToken) {
            return;
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Dent.io Invitation",
            text: `
            Your credentials for Dent.io account:
            login: ${login}
            password: ${password}
            
            `,
        });
        console.log("sent");
        return result;
    }
}
