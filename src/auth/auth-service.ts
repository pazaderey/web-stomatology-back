import { UserAuthentication } from "./auth";

/**
 *
 */
export default class AuthService {
    /**
     *
     * @returns
     */
    async login(authUser: UserAuthentication): Promise<void> {
        console.log(authUser);
        return;
    }

    /**
     *
     * @returns
     */
    async invite(email: string): Promise<void> {
        console.log(email);
        return;
    }
}
