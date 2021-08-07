import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ITraining } from '../models/training';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class TrainingStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable trainingRegistry = new Map();
  @observable training: ITraining | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get trainingsByDate() {
    return Array.from(this.trainingRegistry.values()) 
  }

  @action loadTrainings = async () => {
    this.loadingInitial = true;
    try {
      const trainings = await agent.Trainings.list();
      runInAction('loading trainings', () => {
        trainings.forEach(training => {
          this.trainingRegistry.set(training .id, training );
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load trainings error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadTraining = async (id: string) => {
    let training= this.getTraining(id);
    if (training){
      this.training = training ;
    } else {
      this.loadingInitial = true;
      try {
        training= await agent.Trainings.details(id);
        runInAction('getting training',() => {
          this.training = training;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get training error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearTraining = () => {
    this.training = null;
  }

  getTraining = (id: string) => {
    return this.trainingRegistry.get(id);
  }

  @action createTraining = async (training: ITraining) => {
    this.submitting = true;
    try {
      await agent.Trainings.create(training);
      runInAction('create training', () => {
        this.trainingRegistry.set(training.id, training);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create training error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editTraining = async (training: ITraining) => {
    this.submitting = true;
    try {
      await agent.Trainings.update(training);
      runInAction('editing training', () => {
        this.trainingRegistry.set(training.id, training);
        this.training = training;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit training error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteTraining = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Trainings.delete(id);
      runInAction('deleting training', () => {
        this.trainingRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete training error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}


