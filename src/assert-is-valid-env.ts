const requiredParams = [
    "SECRET_TOKEN",
    "ADMIN_LOGIN",
    "ADMIN_PASSWORD",
    "ADMIN_TOKEN",
    "EMAIL_USER",
    "CLIENT_ID",
    "CLIENT_SECRET",
    "REDIRECT_URI",
    "REFRESH_TOKEN",
];

export default function assertIsValidEnv(env: NodeJS.ProcessEnv): void {
    if (env.PORT === undefined) {
        env.PORT = 3000;
    }

    if (env.DB_HOST === undefined) {
        env.DB_HOST = "localhost";
    }

    if (env.DB_PORT === undefined) {
        env.DB_PORT = 27017;
    }

    if (env.DETECTION_HOST === undefined) {
        env.DB_HOST = "localhost";
    }

    if (env.DETECTION_PORT === undefined) {
        env.DB_PORT = 5000;
    }

    const missing: string[] = [];
    for (const param of requiredParams) {
        if (process.env[param] === undefined) {
            missing.push(param);
        }
    }

    if (missing.length > 0) {
        throw new Error(`Environment params not set: ${missing.join(", ")}`);
    }
}
