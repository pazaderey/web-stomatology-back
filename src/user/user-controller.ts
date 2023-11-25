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
import { UserInfo } from "./user";

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
    async getUser(
        @Query("login") login: string,
    ): Promise<UserInfo | undefined> {
        const user = await this.service.getUser(login);
        if (!user) {
            this.setStatus(404);
            return;
        }
        return user;
    }
}
