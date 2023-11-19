export interface User {
    name: string;
    sex: string;
    email: string;
    phone: string;
    requests: UserRequest[];
}

export interface UserRequest {
    date: Date;
    text: string;
    img: string;
}
