import { UserInfo, User } from "./user";
import path from "path";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { CreateUser } from "src/auth/auth";

const usersPath = path.join(__dirname, "../../../src/user/__mockdata__.json");

/**
 *
 */
export default class UserService {
    /**
     *
     */
    private static instance?: UserService;

    /**
     *
     */
    private readonly users: User[];

    /**
     *
     */
    private constructor() {
        this.users = JSON.parse(readFileSync(usersPath, { encoding: "utf-8" }));
    }

    /**
     *
     * @returns
     */
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    /**
     *
     * @param user
     * @returns
     */
    async saveUser(user: UserInfo): Promise<void> {
        const foundUser = await this.getUser(user.login);
        if (!foundUser) {
            return;
        }

        if (user.email) {
            foundUser.email = user.email;
        }
        if (user.name) {
            foundUser.name = user.name;
        }
        if (user.phone) {
            foundUser.phone = user.phone;
        }
        if (user.sex) {
            foundUser.sex = user.sex;
        }
        return this.writeToFile();
    }

    /**
     *
     * @returns
     */
    async getUser(login: string): Promise<User | undefined> {
        return this.users.find((u) => u.login === login);
    }

    /**
     *
     * @param createUser
     */
    async createUser(createUser: CreateUser) {
        const user: User = {
            ...createUser,
            name: "",
            sex: "",
            phone: "",
            requests: [],
        };
        this.users.push(user);
        return this.writeToFile();
    }

    /**
     *
     */
    private async writeToFile() {
        await writeFile(usersPath, JSON.stringify(this.users), {
            encoding: "utf-8",
        });
    }
}
