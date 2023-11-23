import { CreateUser, UserAuthentication } from "./auth";
import { User, UserService } from "../user";
import * as bcrypt from "bcrypt";
import * as crypto from "node:crypto";
import * as jwt from "jsonwebtoken";

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
        const password = crypto.randomBytes(10).toString("hex");
        const hashed = await bcrypt.hash(password, 8);

        const newUser: CreateUser = {
            email,
            login: email.split("@")[0],
            password: hashed,
        };

        await this.userService.createUser(newUser);
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
