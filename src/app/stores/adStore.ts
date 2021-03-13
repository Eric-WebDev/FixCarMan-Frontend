import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IAdvert } from '../models/advertsFixCar/adverts';
import { RootStore } from './rootStore';
import { setAdProps } from '../Common/util/util';
const LIMIT = 5;
export default class AdStore {

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
  this.rootStore = rootStore;

  reaction(
    () => this.predicate.keys(),
    () => {
      this.page = 0;
      this.adRegistry.clear();
      this.loadAds();
    }
  )
}
@observable adRegistry = new Map();
@observable ad: IAdvert | null = null;
@observable loadingInitial = false;
@observable submitting = false;
@observable target = '';
@observable loading = false;
@observable adCount = 0;
@observable page = 0;
@observable predicate = new Map();

@action setPredicate = (predicate: string, value: string | Date) => {
  this.predicate.clear();
  if (predicate !== 'all') {
    this.predicate.set(predicate, value);
  }
}

@computed get axiosParams() {
  const params = new URLSearchParams();
  params.append('limit', String(LIMIT));
  params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
  this.predicate.forEach((value, key) => {
    if (key === 'startDate') {
      params.append(key, value.toISOString())
    } else {
      params.append(key, value)
    }
  })
  return params;
}

@computed get totalPages() {
  return Math.ceil(this.adCount / LIMIT);
}

@action setPage = (page: number) => {
  this.page = page;
}

@computed get adsByDate() {
  return this.groupAdsByDate(
    Array.from(this.adRegistry.values())
  );
}
groupAdsByDate(ads: IAdvert[]) {
  const sortedAds = ads.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  return Object.entries(
    sortedAds.reduce(
      (ads, ad) => {
        const date = ad.date.toISOString().split('T')[0];
        ads[date] = ads[date]
          ? [...ads[date], ad]
          : [ad];
        return ads;
      },
      {} as { [key: string]: IAdvert[] }
    )
  );
}

@action loadAds = async () => {
  this.loadingInitial = true;
  try {
    const adsEnvelope = await agent.Adverts.list(this.axiosParams);
    const {adverts, advertCount} = adsEnvelope;
    runInAction('loading ads', () => {
      adverts.forEach(ad => {
        setAdProps(ad, this.rootStore.userStore.user!);
        this.adRegistry.set(ad.id, ad);
      });
      this.adCount = advertCount;
      this.loadingInitial = false;
    });
  } catch (error) {
    runInAction('load ads error', () => {
      this.loadingInitial = false;
    });
  }
  };

 
  @action loadAd = async (id: string) => {
    let ad = this.getAd(id);
    if (ad) {
      this.ad = ad;
      return toJS(ad);
    } else {
      this.loadingInitial = true;
      try {
        ad = await agent.Adverts.details(id);
        runInAction('getting ad', () => {
          setAdProps(ad, this.rootStore.userStore.user!);
          this.ad = ad;
          this.adRegistry.set(ad.id, ad);
          this.loadingInitial = false;
        });
        return ad;
      } catch (error) {
        runInAction('get ad error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearAd = () => {
    this.ad= null;
  };

  getAd = (id: string) => {
    return this.adRegistry.get(id);
  };

  @action createAd = async (ad: IAdvert) => {
    this.submitting = true;
    try {
      await agent.Adverts.create(ad);
      runInAction('create ad', () => {
        this.adRegistry.set(ad.id, ad);
        this.submitting = false;
      });
      history.push(`/adverts/${ad.id}`);
    } catch (error) {
      runInAction('create ad error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editAd = async (ad: IAdvert) => {
    this.submitting = true;
    try {
      await agent.Adverts.update(ad);
      ad.isAdvertCreator=true;
      runInAction('editing ad', () => {
        this.adRegistry.set(ad.id, ad);
        this.ad = ad;
        this.submitting = false;
      });
      history.push(`/adverts/${ad.id}`);
    } catch (error) {
      runInAction('edit ad error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteAd = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Adverts.delete(id);
      runInAction('deleting ad', () => {
        this.adRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete ad error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}