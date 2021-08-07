import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IService } from '../models/service';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ServiceStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }



  @observable serviceRegistry = new Map();
  @observable service: IService | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get servicesByDate() {
    return Array.from(this.serviceRegistry.values()) 
  }

  @action loadServices = async () => {
    this.loadingInitial = true;
    try {
      const services = await agent.Services.list();
      runInAction('loading services', () => {
        services.forEach(service => {
          this.serviceRegistry.set(service.id, service);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadService = async (id: string) => {
    let service = this.getService(id);
    if (service){
      this.service = service;
    } else {
      this.loadingInitial = true;
      try {
        service = await agent.Services.details(id);
        runInAction('getting services',() => {
          this.service = service;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get service error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearService = () => {
    this.service = null;
  }

  getService = (id: string) => {
    return this.serviceRegistry.get(id);
  }

  @action createService = async (service: IService) => {
    this.submitting = true;
    try {
      await agent.Services.create(service);
      runInAction('create service', () => {
        this.serviceRegistry.set(service.id, service);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create service error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editService = async (service: IService) => {
    this.submitting = true;
    try {
      await agent.Services.update(service);
      runInAction('editing service', () => {
        this.serviceRegistry.set(service.id, service);
        this.service = service;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit service error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteService = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Services.delete(id);
      runInAction('deleting service', () => {
        this.serviceRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete service error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

