export interface IProfile {
  id: string;
  username: string;
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

export interface IVehicle {
  id: string;
  registrationNumber: string;
  description: string;
  registrationYear: string;
  carMake: string;
  carModel: string;
  bodyStyle: string;
  transmission: string;
  fuelType: string;
  numberOfSeats: string;
  numberOfDoors: string;
  engineSize: string;
  vin: string;
}


export interface IVehicleFormValues {
  id: string ;
  registrationNumber: string ;
  description: string ;
  registrationYear: string ;
  carMake: string ;
  carModel: string ;
  bodyStyle: string ;
  transmission: string ;
  fuelType: string ;
  numberOfSeats: string;
  numberOfDoors: string;
  engineSize: string ;
  vin: string ;
}
