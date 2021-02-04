import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IAdvert } from '../models/advertsFixCar/adverts';

configure({enforceActions: 'always'});

class AdStore {
  @observable adRegistry = new Map();
  @observable ad: IAdvert | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return this.groupAdsByDate(Array.from(this.adRegistry.values()))
  }

  groupAdsByDate(activities: IAdvert[]) {
    const sortedAds = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    return Object.entries(sortedAds.reduce((ads, ad) => {
      const date = ad.date.toISOString().split('T')[0];
      ads[date] = ads[date] ? [...ads[date], ad] : [ad];
      return ads;
    }, {} as {[key: string]: IAdvert[]}));
  }

  @action loadAds = async () => {
    this.loadingInitial = true;
    try {
      const ads = await agent.Adverts.list();
      runInAction('loading ads', () => {
        ads.forEach(ad => {
          ad.date = new Date(ad.date);
          this.adRegistry.set(ad.id, ad);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadAd = async (id: string) => {
    let ad = this.getAd(id);
    if (ad) {
      this.ad = ad;
      return ad;
    } else {
      this.loadingInitial = true;
      try {
        ad = await agent.Adverts.details(id);
        runInAction('getting ads',() => {
          ad.date = new Date(ad.date);
          this.ad = ad;
          this.adRegistry.set(ad.id, ad);
          this.loadingInitial = false;
        })
        return ad;
      } catch (error) {
        runInAction('get ad error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearAd = () => {
    this.ad = null;
  }

  getAd = (id: string) => {
    return this.adRegistry.get(id);
  }

  @action createAd = async (ad: IAdvert) => {
    this.submitting = true;
    try {
      await agent.Adverts.create(ad);
      runInAction('create ad', () => {
        this.adRegistry.set(ad.id, ad);
        this.submitting = false;
      })
      history.push(`/adverts`)
      console.log(ad);
    } catch (error) {
      runInAction('create ads error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editAd = async (ad: IAdvert) => {
    this.submitting = true;
    try {
      await agent.Adverts.update(ad);
      runInAction('editing add', () => {
        this.adRegistry.set(ad.id, ad);
        this.ad = ad;
        this.submitting = false;
      })
      history.push(`/adverts/${ad.id}`)
    } catch (error) {
      runInAction('edit ads error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteAd = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Adverts.delete(id);
      runInAction('deleting ad', () => {
        this.adRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete ad error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

export default createContext(new AdStore());
