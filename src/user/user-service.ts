import { UserInfo } from "./user";
import path from "path";
import { open } from "fs/promises";

/**
 *
 */
export default class UserService {
    /**
     *
     * @param user
     * @returns
     */
    async saveUser(user: UserInfo): Promise<void> {
        console.log(user);
        return;
    }

    /**
     *
     * @returns
     */
    async getUser(): Promise<UserInfo> {
        const file = await open(
            path.join(__dirname, "../../../src/user/__mockdata__.json"),
        );
        const buffer = await file.readFile("utf-8");

        await file.close();
        return JSON.parse(buffer)[2];
    }
}
