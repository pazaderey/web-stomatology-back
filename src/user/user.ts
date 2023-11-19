export interface User {
    name: string;
    sex: string;
    email: string;
    phone: string;
    requests: UserRequest[];
    login: string;
    password: string;
}

export type UserInfo = Omit<User, "requests" | "login" | "password">;

export interface UserRequest {
    date: Date;
    text: string;
    img: string;
}
