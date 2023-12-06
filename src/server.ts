import { app } from "./app";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const PORT = process.env.PORT || 3000;

async function init() {
    await mongoose.connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    );
}

init().then(() =>
    app.listen(PORT, () => {
        console.log(`Started on ${PORT}`);
    }),
);
