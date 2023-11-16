import { Route, Post } from "tsoa";

@Route("auth")
export class AuthController {
    @Post("login")
    async login(): Promise<void> {
        return;
    }

    @Post("invite")
    async invite(): Promise<void> {
        return;
    }
}
