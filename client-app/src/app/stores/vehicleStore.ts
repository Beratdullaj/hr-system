import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IVehicle } from '../models/vehicle';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class VehicleStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }




  @observable vehicleRegistry = new Map();
  @observable vehicle: IVehicle | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get vehiclesByDate() {
    return Array.from(this.vehicleRegistry.values()) 
  }

  @action loadVehicles = async () => {
    this.loadingInitial = true;
    try {
      const vehicles = await agent.Vehicles.list();
      runInAction('loading vehicles', () => {
        vehicles.forEach(vehicle => {
          this.vehicleRegistry.set(vehicle.id, vehicle);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadVehicle = async (id: string) => {
    let vehicle = this.getVehicle(id);
    if (vehicle){
      this.vehicle = vehicle;
    } else {
      this.loadingInitial = true;
      try {
        vehicle = await agent.Vehicles.details(id);
        runInAction('getting vehicles',() => {
          this.vehicle = vehicle;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get vehicle error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearVehicle = () => {
    this.vehicle = null;
  }

  getVehicle = (id: string) => {
    return this.vehicleRegistry.get(id);
  }

  @action createVehicle = async (vehicle: IVehicle) => {
    this.submitting = true;
    try {
      await agent.Vehicles.create(vehicle);
      runInAction('create vehicle', () => {
        this.vehicleRegistry.set(vehicle.id, vehicle);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create vehicle error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editVehicle = async (vehicle: IVehicle) => {
    this.submitting = true;
    try {
      await agent.Vehicles.update(vehicle);
      runInAction('editing vehicle', () => {
        this.vehicleRegistry.set(vehicle.id, vehicle);
        this.vehicle = vehicle;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit vehicle error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteVehicle = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Vehicles.delete(id);
      runInAction('deleting vehicle', () => {
        this.vehicleRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete vehicle error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

