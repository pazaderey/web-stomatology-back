import { UserInfo, User, UserModel } from "./schemas";

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
     * @returns
     */
    async getUserCount(login: string) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.getUserCount with login: " +
                login,
        );
        const loginRegex = new RegExp(`^${login}`);
        return (await UserModel.find({ login: loginRegex })).length;
    }

    /**
     *
     * @param user
     * @returns
     */
    async saveUser(user: UserInfo): Promise<void> {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.saveUser with user: " +
                JSON.stringify(user),
        );

        const foundUser = await this.getUserByLogin(user.login);
        if (!foundUser) {
            console.log(
                new Date().toLocaleTimeString() +
                    " [LOG] UserService.saveUser user not found user: " +
                    JSON.stringify(user),
            );
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
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.getUserByLogin with login: " +
                login,
        );

        return UserModel.findOne({ login });
    }

    /**
     *
     * @param email
     * @returns
     */
    async getUserByEmail(email: string) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.getUserByEmail with email: " +
                email,
        );

        return UserModel.findOne({ email });
    }

    /**
     * Creates empty user
     * @param createUser
     * @returns user's password
     */
    async createUser(
        login: string,
        email?: string,
        password?: string,
    ): Promise<string | null> {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.createUser with params: \n" +
                `login: ${login} ` +
                `email: ${email} `,
        );

        const foundUser = await this.getUserByLogin(login);
        if (foundUser !== null) {
            console.log(
                new Date().toLocaleTimeString() +
                    " [LOG] UserService.createUser user already exists with login: " +
                    login,
            );
            return null;
        }

        const [userPassword, hashed] =
            await UserModel.generatePassword(password);

        const user: User = {
            email: email ?? "",
            login,
            password: hashed,
            name: "",
            sex: "m",
            phone: "",
        };

        const newUser = new UserModel(user);
        await newUser.save();

        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] UserService.createUser user created: " +
                JSON.stringify(user),
        );

        return userPassword;
    }
}
