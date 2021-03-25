import { RootStore } from './rootStore';
import { observable, action, runInAction, computed, reaction } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IProfile, IUserAdvert, IVehicle } from '../models/profiles/profile';
import { IUser } from '../models/users/user';


export default class VehicleStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable vehicle: IVehicle | null = null;
  @observable user: IUser | null = null;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable activeTab: number = 0;
  // @observable userid: string = "a";
  @observable userVehicles: IVehicle[] = [];
  @observable loadingVehicles = false;



  @action loadUserVehicles = async (id:string, predicate?: string) => {
    this.loadingVehicles = true;
    try {
      const vehicles = await agent.Vehicles.listVehicles(id,predicate!);     
      console.log(id)
      runInAction(() => {
        this.userVehicles = vehicles;
        this.loadingVehicles = false;
        console.log(vehicles);
      });
    } catch (error) {
      runInAction(() => {
        this.loadingVehicles = false;
        toast.error('Problem loading vehicle data');
      });
      console.log(error);
    }
  }
}
