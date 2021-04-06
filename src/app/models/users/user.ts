
export interface IUser {
    id:string;
    username: string;
    token: string;
    image?: string;
    UserGarage?:string;
}
export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
    UserGarage?:string;
}