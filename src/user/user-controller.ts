import { Route, Patch, Controller, Body, Get } from "tsoa";
import UserService from "./user-service";
import { User } from "./user";

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
    async save(@Body() user: Omit<User, "requests">): Promise<void> {
        return this.service.saveUser(user);
    }

    /**
     *
     * @returns
     */
    @Get()
    async getUser(): Promise<User> {
        return this.service.getUser();
    }
}
