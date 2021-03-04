import { IAdvert } from "../../models/advertsFixCar/adverts";
import { IProfile, IUser } from "../../models/users/user";

export const combineDateAndTime = (date: Date) => {
    // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;

    const dateString = date.toISOString().split('T')[0];
    // const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + 'T' );
}
export const setAdProps = (ad: IAdvert) => {
    ad.date = new Date(ad.date);
    return ad;
}

