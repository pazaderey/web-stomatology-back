import { Route, Patch, Controller, Body, Get, Query, Security } from "tsoa";
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
     *
     * @returns
     */
    @Security("jwt")
    @Patch()
    async save(@Body() user: UserInfo): Promise<void> {
        return this.service.saveUser(user);
    }

    /**
     *
     * @returns
     */
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
