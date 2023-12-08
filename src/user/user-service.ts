import { UserInfo, User, UserModel } from "./schemas";
import { CreateUser } from "src/auth/auth";

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
    private constructor() {}

    /**
     *
     */
    public static async getInstance() {
        if (UserService.instance === undefined) {
            UserService.instance = new UserService();
            await UserService.instance.createUser({
                login: process.env.ADMIN_LOGIN,
                password: process.env.ADMIN_PASSWORD,
                email: "admin@admin.admin",
            });
        }

        return UserService.instance;
    }

    /**
     *
     * @returns
     */
    async getUserCount(login: string) {
        const loginRegex = new RegExp(`^${login}`);
        return (await UserModel.find({ login: loginRegex })).length;
    }

    /**
     *
     * @param user
     * @returns
     */
    async saveUser(user: UserInfo): Promise<void> {
        const foundUser = await this.getUserByLogin(user.login);
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
        foundUser.save();
    }

    /**
     *
     * @returns
     */
    async getUserByLogin(login: string) {
        return UserModel.findOne({ login });
    }

    /**
     *
     * @param email
     * @returns
     */
    async getUserByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    /**
     *
     * @param createUser
     */
    async createUser(createUser: CreateUser) {
        const user: User = {
            ...createUser,
            name: "",
            sex: "m",
            phone: "",
        };

        const newUser = new UserModel(user);
        return newUser.save();
    }
}
