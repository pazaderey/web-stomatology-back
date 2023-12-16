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
        return Promise.reject("Incorrect authentication type");
    }

    const token = request.headers["x-access-token"];
    if (Array.isArray(token) || token === undefined) {
        return Promise.reject("Incorrect token");
    }

    let secretTokens: string[];
    if (scopes && scopes.length === 1 && scopes[0] === "admin") {
        secretTokens = [process.env.ADMIN_TOKEN];
    } else {
        secretTokens = [process.env.ADMIN_TOKEN, process.env.SECRET_TOKEN];
    }
    return Promise.any(secretTokens.map((s) => jwtVerify(token, s)));
}

function jwtVerify(
    token: string,
    secret: string,
): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            secret,
            (
                err: jwt.VerifyErrors | null,
                decoded?: string | jwt.JwtPayload,
            ) => {
                err ? reject(err) : resolve(decoded);
            },
        );
    });
}
