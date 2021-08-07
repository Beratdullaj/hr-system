import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IAboutUs } from '../models/aboutus';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class AboutUsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }

  @observable aboutusRegistry = new Map();
  @observable aboutus: IAboutUs | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get about_usByDate() {
    return Array.from(this.aboutusRegistry.values()) 
  }

  @action loadAbout_Us = async () => {
    this.loadingInitial = true;
    try {
      const about_us = await agent.About_Us.list();
      runInAction('loading about us', () => {
        about_us.forEach(aboutus => {
          this.aboutusRegistry.set(aboutus.id, aboutus);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load about us error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadAboutUs = async (id: string) => {
    let aboutus = this.getAboutUs(id);
    if (aboutus){
      this.aboutus = aboutus;
    } else {
      this.loadingInitial = true;
      try {
        aboutus = await agent.About_Us.details(id);
        runInAction('getting about us',() => {
          this.aboutus = aboutus;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get aboutus information error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearAboutUs = () => {
    this.aboutus = null;
  }

  getAboutUs = (id: string) => {
    return this.aboutusRegistry.get(id);
  }

  @action createAboutUs = async (aboutus: IAboutUs) => {
    this.submitting = true;
    try {
      await agent.About_Us.create(aboutus);
      runInAction('create activity', () => {
        this.aboutusRegistry.set(aboutus.id, aboutus);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create about us error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editAboutUs = async (aboutus: IAboutUs) => {
    this.submitting = true;
    try {
      await agent.About_Us.update(aboutus);
      runInAction('editing about us', () => {
        this.aboutusRegistry.set(aboutus.id, aboutus);
        this.aboutus = aboutus;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit about us error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteAboutUs = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.About_Us.delete(id);
      runInAction('deleting about us', () => {
        this.aboutusRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete about us error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

