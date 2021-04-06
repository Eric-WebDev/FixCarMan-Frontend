import { observable, computed, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { IUser, IUserFormValues } from '../models/users/user';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
 
  @computed get isLoggedIn() {
    return !!this.user;
  }
  @computed get isGarage() {
    if (this.rootStore.userStore.user?.userGarage !== "garage") {
      return true;
    } else {
      return false;
    }
  }
  
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
        console.log(user)
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/adverts');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      console.log(values)
      history.push('/')
    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
}
