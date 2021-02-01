export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    profileDescription: string;
    email: string;
    phoneNumber: string;
    url: string;
    birthday: string | null;
    street: string;
    city: string;
    county: string;
    zipCode: string;
    isUserGarage: boolean;
}