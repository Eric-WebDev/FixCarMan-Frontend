import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { IProfile, IUserAdvert, IVehicle } from "../models/profiles/profile";
import { IUser } from "../models/users/user";
import { history } from "../..";

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
  @observable userVehicles: IVehicle[] = [];
  @observable loadingVehicles = false;
  @observable submitting = false;
  @observable adRegistry = new Map();

  @action loadUserVehicles = async (id: string, predicate?: string) => {
    this.loadingVehicles = true;
    try {
      const vehicles = await agent.Vehicles.getVehicle(id, predicate!);
      runInAction(() => {
        this.userVehicles = vehicles;
        this.loadingVehicles = false;
        console.log(vehicles);
      });
    } catch (error) {
      runInAction(() => {
        this.loadingVehicles = false;
        toast.error("Problem loading vehicle data");
      });
      console.log(error);
    }
  };

  @action createVehicle = async (vehicle: IVehicle) => {
    try {
      await agent.Vehicles.create(vehicle);
      // vehicle.id == this.rootStore.userStore.user!.id
      runInAction(() => {
        this.vehicle=vehicle;
        //  this.adRegistry.set(vehicle.id, vehicle);
      });
    } catch (error) {
      toast.error('Problem creating profile');
    }
  };

  // @action createVehicle = async (vehicle: IVehicle) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Vehicles.create(vehicle);
  //     runInAction("create vehicle", () => {
  //       this.adRegistry.set(vehicle.id, vehicle);
  //       this.submitting = false;
  //     });
  //     history.push(`/vehicles`);
  //   } catch (error) {
  //     runInAction("create vehicle error", () => {
  //       this.submitting = false;
  //     });
  //     toast.error("Problem submitting data");
  //     console.log(error.response);
  //   }
  // };
}
