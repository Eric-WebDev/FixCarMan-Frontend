export interface IProfile {
    username: string;
    token: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    profileDescription: string;
    email: string;
    phoneNumber?: string;
    url?: string;
    birthday: string | null;
    street: string;
    city: string;
    county: string;
    zipCode?: string;
    image?:string;
    isUserGarage?: boolean;
}

export interface IUser {
    username: string;
    displayUserName: string;
    token: string;
    image?: string;
}
export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}