import { readFileSync } from "fs";
import { UserAuthentication } from "./auth";
import path from "path";
import { User } from "src/user/user";

/**
 *
 */
export default class AuthService {
    /**
     *
     */
    private readonly users: User[];

    constructor() {
        this.users = JSON.parse(
            readFileSync(
                path.join(__dirname, "../../../src/user/__mockdata__.json"),
                { encoding: "utf-8" },
            ),
        );
    }
    /**
     *
     * @returns
     */
    async login(authUser: UserAuthentication): Promise<void> {
        const foundUser = this.users.find((u) => u.login === authUser.login);
        if (foundUser === undefined) {
            throw new Error("No user found");
        }
        if (foundUser.password !== authUser.password) {
            throw new Error("Incorrect password");
        }
        return;
    }

    /**
     *
     * @returns
     */
    async invite(email: string): Promise<void> {
        console.log(email);
        return;
    }
}
