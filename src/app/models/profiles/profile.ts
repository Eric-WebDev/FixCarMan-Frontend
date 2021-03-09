export interface IProfile {
    username:string;
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
    photos: IPhoto[];
}

export interface IPhoto {
    id: string;
    url: string;
  }
export interface IUserAdvert {
    id: string;
    title: string;
    description: string;
    date: Date;
  }
