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
import { CreateUser } from "../auth/auth";

/**
 *
 */
@Route("user")
export class userController extends Controller {
    /**
     * @summary Save user data
     * @param user User data
     */
    @Response(204, "Saved user")
    @OperationId("saveUser")
    @Security("jwt")
    @Patch()
    async save(@Body() user: UserInfo): Promise<void> {
        const service = await UserService.getInstance();

        this.setStatus(204);
        return service.saveUser(user);
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
    async getUser(
        @Query("login") login: string,
    ): Promise<UserInfo | undefined> {
        const service = await UserService.getInstance();

        const user = await service.getUserByLogin(login);
        if (!user) {
            this.setStatus(404);
            return;
        }
        return user;
    }

    /**
     *
     * @param user
     * @returns
     */
    @Response(200, "Created user")
    @OperationId("addUser")
    @Security("jwt", ["admin"])
    async addUser(@Body() user: CreateUser) {
        const service = await UserService.getInstance();

        return service.createUser(user);
    }
}
