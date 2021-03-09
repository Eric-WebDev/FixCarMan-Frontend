
export interface IUser {
    username: string;
    displayUserName: string;
    token: string;
    image?: string;
}
export interface IUserFormValues {
    email: string;
    password: string;
    username: string;
}