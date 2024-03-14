declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_TOKEN: string;
            ADMIN_LOGIN: string;
            ADMIN_PASSWORD: string;
            ADMIN_TOKEN: string;
            PORT?: number;
            EMAIL_USER: string;
            CLIENT_ID: string;
            CLIENT_SECRET: string;
            REDIRECT_URI: string;
            REFRESH_TOKEN: string;
            DB_HOST: string;
            DB_PORT: number;
            DETECTION_HOST: string;
            DETECTION_PORT: number;
        }
    }
}

export {};
