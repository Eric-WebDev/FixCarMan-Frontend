export interface IAdvertsEnvelope {
    adverts: IAdvert[];
    advertCount: number;
}

export interface IAdvert {
    advertiserUsername?:string;
    advertiserEmail?:string ;
    carModel: string;
    city: string;
    date: Date;
    description?: string;
    id: string; 
    isAdvertCreator?: boolean,
    title: string;
    // isContactAlowed?:boolean,
    // advertiser?: IAdvertiser;
}

export interface IAdvertFormValues extends Partial<IAdvert> {
    time?: Date;
}

export class AdvertFormValues implements IAdvertFormValues {
    id?: string = undefined;
    title: string = '';
    carModel: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    isAdvertCreator: boolean= true;
    city: string = '';
    advertiser?: IAdvertiser = undefined;
    advertiserUsername?:string=undefined;
    constructor(init?: IAdvertFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }  
        Object.assign(this, init);
    }
}

export interface IAdvertiser {
    advertiserId: number ;
    image?:string;
    advertiserUsername?: string ;
    email?: string;
    phoneNumber?: string ;
    isAdvertCreator: boolean;
}
