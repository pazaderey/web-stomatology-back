import { app } from "./app";
import { UserService } from "./user";
import { ReviewService } from "./review";
import { DetectionService } from "./detection";
import { AuthService, EmailService } from "./auth";
import { ArticleService } from "./article";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const PORT = process.env.PORT || 3000;

async function init() {
    await mongoose.connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    );

    await UserService.getInstance();
    AuthService.getInstance();
    DetectionService.getInstance();
    ArticleService.getInstance();
    ReviewService.getInstance();
    EmailService.getInstance();
}

init().then(() =>
    app.listen(PORT, () => {
        console.log(`Started on ${PORT}`);
    }),
);
