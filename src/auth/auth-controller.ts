import {
    Route,
    Post,
    Controller,
    Body,
    Query,
    Security,
    OperationId,
    Response,
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
    private readonly service = AuthService.getInstance();

    /**
     * @summary Try login and get authentication token
     * @param authUser Login and password
     * @returns Token for successful login
     */
    @Response(200, "Successful login")
    @Response(406, "Invalid credentials")
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
            this.setStatus(406);
            return;
        }
    }

    /**
     * @summary Send user an invitation email
     * @param email Receiver's email
     */
    @Response(200, "Invited")
    @OperationId("invite")
    @Security("jwt")
    @Post("invite")
    async invite(@Query() email: string): Promise<void> {
        await this.service.invite(email);
    }
}
