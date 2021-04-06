import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import {
  IPhoto,
  IProfile,
  IUserAdvert,
  IVehicle,
} from "../models/profiles/profile";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable loadingVehicles = true;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable activeTab: number = 0;
  @observable userVehicles: IVehicle[] = [];
  @observable userAdverts: IUserAdvert[] = [];
  @observable loadingAdverts = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadUserAdverts = async (username: string, predicate?: string) => {
    this.loadingAdverts = true;
    try {
      const adverts = await agent.Profiles.listAdverts(username, predicate!);
      runInAction(() => {
        this.userAdverts = adverts;
        this.loadingAdverts = false;
      });
    } catch (error) {
      toast.error("Problem loading adverts");
      runInAction(() => {
        this.loadingAdverts = false;
      });
    }
  };
  @action setActiveTab = (activeIndex: number) => {
    this.activeTab = activeIndex;
  };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };
  @action create = async (profile: Partial<IProfile>) => {
    try {
      await agent.Profiles.create(profile);
      runInAction(() => {
        if (profile.username !== this.rootStore.userStore.user!.username) {
          this.rootStore.userStore.user!.username = profile.username!;
        }
        this.profile = { ...this.profile!, ...profile };
      });
    } catch (error) {
      toast.error("Problem creating profile");
    }
  };

  @action updateProfile = async (profile: Partial<IProfile>) => {
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (profile.username !== this.rootStore.userStore.user!.username) {
          this.rootStore.userStore.user!.username = profile.username!;
        }
        this.profile = { ...this.profile!, ...profile };
      });
    } catch (error) {
      toast.error("Problem updating profile");
    }
  };
}
