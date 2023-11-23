import {
    Route,
    Patch,
    Controller,
    Body,
    Get,
    Query,
    Security,
    OperationId,
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
    @OperationId("saveUser")
    @Security("jwt")
    @Patch()
    async save(@Body() user: UserInfo): Promise<void> {
        return this.service.saveUser(user);
    }

    /**
     * @summary Get user by login
     * @param login User's login
     * @returns UserInfo on success
     */
    @OperationId("getUser")
    @Security("jwt")
    @Get()
    async getUser(
        @Query("login") login: string,
    ): Promise<UserInfo | undefined> {
        const user = this.service.getUser(login);
        if (!user) {
            this.setStatus(403);
            return;
        }
        return user;
    }
}
