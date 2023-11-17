import { Route, Post, Controller, Body, Query } from "tsoa";
import AuthService from "./auth-service";
import { UserAuthentication } from "./auth";

/**
 *
 */
@Route("auth")
export class AuthController extends Controller {
    /**
     *
     */
    private readonly service = new AuthService();

    /**
     *
     * @returns
     */
    @Post("login")
    async login(@Body() authUser: UserAuthentication): Promise<void> {
        return this.service.login(authUser);
    }

    /**
     *
     * @returns
     */
    @Post("invite")
    async invite(@Query() email: string): Promise<void> {
        return this.service.invite(email);
    }
}
