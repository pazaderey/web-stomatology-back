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
    private readonly userService = UserService.getInstance();

    /**
     *
     */
    private readonly emailService = EmailService.getInstance();

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
        const login = email.split("@")[0];
        console.log("login: ", login);

        const foundUser = await this.userService.getUser(login);
        if (foundUser !== undefined) {
            console.error("User exists!");
            return;
        }
        console.log("user not found");

        const password = crypto.randomBytes(10).toString("hex").slice(0, 10);
        const salt = await bcrypt.genSalt(8);
        const hashed = await bcrypt.hash(password, salt);
        console.log(email, login, password);

        const newUser: CreateUser = {
            email,
            login,
            password: hashed,
        };

        await this.userService.createUser(newUser);
        console.log(await this.emailService.sendEmail(email, login, password));
    }

    /**
     *
     * @param user
     */
    private async generateToken(user: User) {
        const payload = { username: user.name, userLogin: user.login };
        return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "1h" });
    }

    /**
     *
     * @param userAuth
     * @returns
     */
    private async validateUser(userAuth: UserAuthentication): Promise<User> {
        const user = await this.userService.getUser(userAuth.login);
        if (user === undefined) {
            throw new Error("User not found: " + userAuth.login);
        }
        const trueUser = await bcrypt.compare(userAuth.password, user.password);
        if (trueUser) {
            return user;
        }
        throw new Error("Incorrect password");
    }
}
