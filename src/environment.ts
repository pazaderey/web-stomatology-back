declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_TOKEN: string;
            PORT?: number;
        }
    }
}

export {};
