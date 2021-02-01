export interface IAdvert {
    id: number;
    title: string;
    carModel: string;
    description: string;
    date: string;
    city: string;
    photos: IPhoto[];
    advertiser: IAdvertiser;
}
export interface IAdvertiser {
    advertiserId: number;
    advertiserName: string;
    email: string;
    phoneNumber: string;
}
export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
    photoAdvert: IAdvert;
}
