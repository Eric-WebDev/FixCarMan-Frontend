import { IAdvert } from "../../models/advertsFixCar/adverts";
import { IUser } from "../../models/users/user";

export const combineDateAndTime = (date: Date,time:Date) => {
    // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    // const dateString = date.toISOString().split('T')[0];
    // const timeString = time.toISOString().split('T')[1];

    return new Date(dateString );
}
export const setAdProps = (advert: IAdvert, user: IUser) => {
    advert.date = new Date(advert.date);
    return advert;
}

