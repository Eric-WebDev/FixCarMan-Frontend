import { IUser } from "../users/user";

export interface UserProfileDetails {
    appUserId: string;
    appUser: IUser;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    profileDescription: string;
    uRL?: string;
    birthday: string | null;
    street: string;
    city: string;
    county: string;
    zipCode: string;
    isUserGarage: boolean;
    advertId: string;
    image: string;
}
