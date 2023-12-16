import { UserAuthentication } from "./auth";
import { User, UserService } from "../user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import EmailService from "./email-service";

/**
 *
 */
export default class AuthService {
    /**
     *
     */
    private static instance?: AuthService;

    /**
     *
     */
    private readonly emailService = EmailService.getInstance();

    /**
     *
     */
    private readonly userService = UserService.getInstance();

    /**
     *
     */
    private constructor() {}

    /**
     *
     */
    public static getInstance(): AuthService {
        if (AuthService.instance === undefined) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     *
     * @returns
     */
    async login(authUser: UserAuthentication): Promise<string> {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.login with login: " +
                authUser.login,
        );

        const user = await this.validateUser(authUser);
        return this.generateToken(user);
    }

    /**
     *
     * @returns
     */
    async invite(email: string): Promise<void> {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.invite with email:" +
                email,
        );

        let login = email.split("@")[0];

        const foundUser = await this.userService.getUserByEmail(email);
        if (foundUser) {
            return;
        }

        const foundUserCount = await this.userService.getUserCount(login);
        if (foundUserCount !== 0) {
            login = login + foundUserCount;
        }

        const password = await this.userService.createUser(email, login);
        if (password === null) {
            return;
        }
        await this.emailService.sendEmail(email, login, password);
    }

    /**
     *
     * @param user
     */
    private async generateToken(user: User) {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.generateToken for user: " +
                JSON.stringify(user),
        );

        const payload = { userLogin: user.login };

        const token =
            user.login === process.env.ADMIN_LOGIN
                ? process.env.ADMIN_TOKEN
                : process.env.SECRET_TOKEN;

        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.generateToken token generated: " +
                JSON.stringify(user),
        );

        return jwt.sign(payload, token, { expiresIn: "1h" });
    }

    /**
     *
     * @param userAuth
     * @returns
     */
    private async validateUser(userAuth: UserAuthentication): Promise<User> {
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.validateUser for login: " +
                userAuth.login,
        );

        const user = await this.userService.getUserByLogin(userAuth.login);
        if (user === null) {
            console.log(
                new Date().toLocaleTimeString() +
                    " [LOG] AuthService.validateUser user not found: " +
                    JSON.stringify(user),
            );
            throw new Error("User not found: " + userAuth.login);
        }
        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.generateToken user found: " +
                JSON.stringify(user),
        );

        const trueUser = await bcrypt.compare(userAuth.password, user.password);
        if (trueUser) {
            console.log(
                new Date().toLocaleTimeString() +
                    " [LOG] AuthService.generateToken correct password: " +
                    JSON.stringify(user),
            );
            return user;
        }

        console.log(
            new Date().toLocaleTimeString() +
                " [LOG] AuthService.generateToken incorrect password: " +
                JSON.stringify(user),
        );
        throw new Error("Incorrect password");
    }
}
