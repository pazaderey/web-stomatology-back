import { app } from "./app";
import { UserService } from "./user";
import { ReviewService } from "./review";
import { DetectionService } from "./detection";
import { AuthService, EmailService } from "./auth";
import { ArticleService } from "./article";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import assertIsValidEnv from "./assert-is-valid-env";

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function init() {
    assertIsValidEnv(process.env);

    await mongoose.connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    );

    const userService = UserService.getInstance();
    await userService.createUser(
        process.env.ADMIN_LOGIN,
        undefined,
        process.env.ADMIN_PASSWORD,
    );
    console.log(new Date().toLocaleTimeString() + " [LOG] admin user created");

    AuthService.getInstance();
    DetectionService.getInstance();
    ArticleService.getInstance();
    ReviewService.getInstance();
    EmailService.getInstance();
}

init().then(() =>
    app.listen(process.env.PORT, () => {
        console.log(
            new Date().getTime() + ` [LOG] Started on ${process.env.PORT}`,
        );
    }),
);
