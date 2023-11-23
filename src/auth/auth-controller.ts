import {
    Route,
    Post,
    Controller,
    Body,
    Query,
    Security,
    OperationId,
} from "tsoa";
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
     * @summary Try login and get authentication token
     * @param authUser Login and password
     * @returns Token for successful login
     */
    @OperationId("login")
    @Post("login")
    async login(
        @Body() authUser: UserAuthentication,
    ): Promise<{ token: string } | undefined> {
        try {
            const token = await this.service.login(authUser);
            this.setStatus(200);
            return { token };
        } catch (ex) {
            this.setStatus(403);
            return;
        }
    }

    /**
     * @summary Send user an invitation email
     * @param email Receiver's email
     */
    @OperationId("invite")
    @Security("jwt")
    @Post("invite")
    async invite(@Query() email: string): Promise<void> {
        return this.service.invite(email);
    }
}
