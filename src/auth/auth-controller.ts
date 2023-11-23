import { Route, Post, Controller, Body, Query, Security } from "tsoa";
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
    async login(
        @Body() authUser: UserAuthentication,
    ): Promise<string | undefined> {
        try {
            const token = await this.service.login(authUser);
            return token;
        } catch (ex) {
            this.setStatus(403);
            return;
        }
    }

    /**
     *
     * @returns
     */
    @Security("jwt")
    @Post("invite")
    async invite(@Query() email: string): Promise<void> {
        return this.service.invite(email);
    }
}
