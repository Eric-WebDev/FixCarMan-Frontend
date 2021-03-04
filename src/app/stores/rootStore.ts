import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import AdStore from './adStore';

configure({enforceActions: 'always'});

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    adStore: AdStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.adStore=new AdStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());