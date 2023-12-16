import {
    Route,
    Patch,
    Controller,
    Body,
    Get,
    Query,
    Security,
    OperationId,
    Response,
} from "tsoa";
import UserService from "./user-service";
import { UserInfo } from "./schemas";

/**
 *
 */
@Route("user")
export class userController extends Controller {
    /**
     *
     */
    private readonly service = UserService.getInstance();

    /**
     * @summary Save user data
     * @param user User data
     */
    @Response(204, "Saved user")
    @OperationId("saveUser")
    @Security("jwt")
    @Patch()
    async save(@Body() user: UserInfo): Promise<void> {
        this.setStatus(204);
        return this.service.saveUser(user);
    }

    /**
     * @summary Get user by login
     * @param login User's login
     * @returns UserInfo on success
     */
    @Response(200, "User found")
    @Response(404, "User not found")
    @OperationId("getUser")
    @Security("jwt")
    @Get()
    async getUser(@Query("login") login: string) {
        const user = await this.service.getUserByLogin(login);
        if (user === null) {
            this.setStatus(404);
            return;
        }
        return user;
    }

    /**
     * @summary Create new user manually
     * @param user User schema
     * @returns void
     */
    @Response(200, "Created user")
    @Response(422, "User already exists")
    @OperationId("addUser")
    @Security("jwt", ["admin"])
    async addUser(@Query("login") login: string) {
        try {
            const result = await this.service.createUser(login);
            if (result === null) {
                this.setStatus(422);
                return;
            }
        } catch (err) {
            this.setStatus(500);
            throw new Error("Something went wrong: " + err);
        }
    }
}
