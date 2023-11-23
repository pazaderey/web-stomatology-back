import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
): Promise<string | jwt.JwtPayload | undefined> {
    if (securityName !== "jwt") {
        return Promise.reject("Incorrect token");
    }
    const token = request.headers["x-access-token"];
    if (Array.isArray(token)) {
        return Promise.reject("Incorrect token");
    }

    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error("No token provided"));
            return;
        }
        jwt.verify(
            token,
            process.env.SECRET_TOKEN,
            (
                err: jwt.VerifyErrors | null,
                decoded?: string | jwt.JwtPayload,
            ) => {
                err ? reject(err) : resolve(decoded);
            },
        );
    });
}
