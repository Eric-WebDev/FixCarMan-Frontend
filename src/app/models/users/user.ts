
export interface IUser {
    id:string;
    username: string;
    token: string;
    image?: string;
    userGarage:string;
}
export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
    userGarage:string;
}