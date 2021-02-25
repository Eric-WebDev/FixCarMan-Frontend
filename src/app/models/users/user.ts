export interface IUser {
    id: number;
    username?: string;
    token: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    profileDescription: string;
    email: string;
    phoneNumber: string;
    url: string;
    birthday: string | null;
    street: string;
    city: string;
    county: string;
    zipCode: string;
    image:string;
    isUserGarage: boolean;
}
export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}