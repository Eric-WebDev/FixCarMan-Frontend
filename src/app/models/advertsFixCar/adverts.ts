export interface IAdvertsEnvelope {
    adverts: IAdvert[];
    advertCount: number;
  }
export interface IAdvert {
    id: string;
    title: string;
    carModel: string;
    description: string;
    date: Date;
    city: string;
    isAdvertCreator: boolean,
    advertiser: IAdvertiser;
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
    image:string;
    username: string ;
    email: string;
    phoneNumber: string ;
    isAdvertCreator: boolean;
}
