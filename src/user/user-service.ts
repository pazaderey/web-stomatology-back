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
    public static getInstance() {
        if (UserService.instance === undefined) {
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
        foundUser.save();
    }

    /**
     *
     * @returns
     */
    async getUser(login: string) {
        const found = await UserModel.findOne({ login });
        return found;
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
