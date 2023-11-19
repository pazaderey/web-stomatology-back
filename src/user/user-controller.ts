import { Route, Patch, Controller, Body, Get } from "tsoa";
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
    private readonly service = new UserService();

    /**
     *
     * @returns
     */
    @Patch()
    async save(@Body() user: UserInfo): Promise<void> {
        return this.service.saveUser(user);
    }

    /**
     *
     * @returns
     */
    @Get()
    async getUser(): Promise<UserInfo> {
        return this.service.getUser();
    }
}
