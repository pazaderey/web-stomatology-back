import express, {
    json,
    urlencoded,
    Request as ExRequest,
    Response as ExResponse,
    NextFunction,
} from "express";
import cors from "cors";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../build/routes";
import swagger from "swagger-ui-express";
import swaggerDocument from "../build/swagger.json";
import dotenv from "dotenv";

export const app = express();

dotenv.config({ path: "./.env" });

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction,
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});
