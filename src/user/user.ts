export interface User {
    name: string;
    sex: string;
    email: string;
    phone: string;
    requests: UserRequest[];
    login: string;
    password: string;
}

export type UserInfo = Pick<User, "login"> &
    Partial<Omit<User, "password" | "requests">>;

export interface UserRequest {
    date: Date;
    text: string;
    img: string;
}
