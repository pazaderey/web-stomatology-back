import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "../build/routes";
import swagger from "swagger-ui-express";
import * as swaggerDocument from "../build/swagger.json";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

RegisterRoutes(app);
