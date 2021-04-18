import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { IVehicle } from "../models/profiles/profile";
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
  @observable vehicleRegistry = new Map();

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
    this.submitting = true;
    const user = await agent.User.current();
    try {
      await agent.Vehicles.create(vehicle);
      runInAction(() => {
        this.vehicle = vehicle;
        this.submitting = false;
      });
      history.push(`/vehicles/${user.username}`);
    } catch (error) {
      toast.error("Problem creating vehicle");
      this.submitting = false;
    }
  };

  @action editVehicle = async (vehicle: IVehicle) => {
    this.submitting = true;
    const user = await agent.User.current();
    try {
      await agent.Vehicles.update(vehicle);
      runInAction(() => {
        this.vehicle = vehicle;
        this.submitting = false;
      });
      history.push(`/vehicles/${user.username}`);
    } catch (error) {
      toast.error("Problem editing vehicle data");
      this.submitting = false;
    }
  };
}
