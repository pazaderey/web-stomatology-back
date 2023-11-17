import { Route, Patch, Controller, Body } from "tsoa";
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
    async save(@Body() user: User): Promise<void> {
        return this.service.saveUser(user);
    }
}
