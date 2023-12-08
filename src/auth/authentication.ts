import * as express from "express";
import * as jwt from "jsonwebtoken";

/**
 *
 * @param request
 * @param securityName
 * @param scopes
 * @returns
 */
export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[],
): Promise<string | jwt.JwtPayload | undefined> {
    if (securityName !== "jwt") {
        return Promise.reject("Incorrect token");
    }

    const token = request.headers["x-access-token"];
    if (Array.isArray(token) || token === undefined) {
        return Promise.reject("Incorrect token");
    }

    let verifyToken = process.env.SECRET_TOKEN;
    if (scopes && scopes.includes("admin")) {
        verifyToken = process.env.ADMIN_TOKEN;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            verifyToken,
            (
                err: jwt.VerifyErrors | null,
                decoded?: string | jwt.JwtPayload,
            ) => {
                err ? reject(err) : resolve(decoded);
            },
        );
    });
}
