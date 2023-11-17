import { User } from "./user";

/**
 *
 */
export default class UserService {
    /**
     *
     * @param user
     * @returns
     */
    async saveUser(user: User): Promise<void> {
        console.log(user);
        return;
    }
}
