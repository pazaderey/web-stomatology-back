import { CreateUser, UserAuthentication } from "./auth";
import { User, UserService } from "../user";
import * as bcrypt from "bcrypt";
import * as crypto from "node:crypto";
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
        const user = await this.validateUser(authUser);
        return this.generateToken(user);
    }

    /**
     *
     * @returns
     */
    async invite(email: string): Promise<void> {
        const userService = await UserService.getInstance();

        let login = email.split("@")[0];

        const foundUser = await userService.getUserByEmail(email);
        if (foundUser) {
            return;
        }

        const foundUserCount = await userService.getUserCount(login);
        if (foundUserCount !== 0) {
            login = login + foundUserCount;
        }

        const password = crypto.randomBytes(10).toString("hex").slice(0, 10);
        const salt = await bcrypt.genSalt(8);
        const hashed = await bcrypt.hash(password, salt);

        const newUser: CreateUser = {
            email,
            login,
            password: hashed,
        };

        await userService.createUser(newUser);
        await this.emailService.sendEmail(email, login, password);
    }

    /**
     *
     * @param user
     */
    private async generateToken(user: User) {
        const payload = { username: user.name, userLogin: user.login };

        const token =
            user.login === process.env.ADMIN_LOGIN
                ? process.env.ADMIN_TOKEN
                : process.env.SECRET_TOKEN;

        return jwt.sign(payload, token, { expiresIn: "1h" });
    }

    /**
     *
     * @param userAuth
     * @returns
     */
    private async validateUser(userAuth: UserAuthentication): Promise<User> {
        const userService = await UserService.getInstance();

        const user = await userService.getUserByLogin(userAuth.login);
        if (user === null) {
            throw new Error("User not found: " + userAuth.login);
        }
        const trueUser = await bcrypt.compare(userAuth.password, user.password);
        if (trueUser) {
            return user;
        }
        throw new Error("Incorrect password");
    }
}
