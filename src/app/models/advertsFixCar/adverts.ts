export interface IAdvertsEnvelope {
    activities: IAdvert[];
    advertCount: number;
  }
export interface IAdvert {
    id: number;
    title: string;
    carModel: string;
    description: string;
    date: Date;
    city: string;
    photos: IPhoto[];
    advertiser: IAdvertiser;
}

export interface IAdvertFormValues extends Partial<IAdvert> {
    time?: Date;

}

export class AdvertFormValues implements IAdvertFormValues {
    id?: number = undefined;
    title: string = '';
    carModel: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    advertiser?: IAdvertiser = undefined;

    constructor(init?: IAdvertFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }  
        Object.assign(this, init);
    }
}

export interface IAdvertiser {
    advertiserId: number ;
    advertiserName: string ;
    email: string;
    phoneNumber: string ;
}
export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
    photoAdvert: IAdvert;
}
