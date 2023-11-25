import { app } from "./app";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
});
