import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IDistribution } from '../models/distribution';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class DistributionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }

  @observable distributionRegistry = new Map();
  @observable distribution: IDistribution | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get distributionsByDate() {
    return Array.from(this.distributionRegistry.values()) 
  }


  @action loadDistributions = async () => {
    this.loadingInitial = true;
    try {
      const distributions = await agent.Distributions.list();
      runInAction('loading Distributions', () => {
        distributions.forEach(distribution => {
          this.distributionRegistry.set(distribution.id, distribution);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load Distributions error', () => {
        this.loadingInitial = false;
      })
    }
  };


  @action loadDistribution = async (id: string) => {
    let distribution = this.getDistribution(id);
    if (distribution){
      this.distribution = distribution;
      return distribution;
    } else {
      this.loadingInitial = true;
      try {
        distribution = await agent.Distributions.details(id);
        runInAction('getting team',() => {
          this.distribution = distribution;
          this.loadingInitial = false;
        })
        return distribution;
      }catch (error) {
        runInAction('get Distribution error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }


  @action clearDistribution = () => {
    this.distribution = null;
  }

  getDistribution = (id: string) => {
    return this.distributionRegistry.get(id);
  }


  @action createDistribution = async (distribution: IDistribution) => {
    this.submitting = true;
    try {
      await agent.Distributions.create(distribution);
      runInAction('create Distribution', () => {
        this.distributionRegistry.set(distribution.id, distribution);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create Distribution error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };


  @action editDistribution = async (distribution: IDistribution) => {
    this.submitting = true;
    try {
      await agent.Distributions.update(distribution);
      runInAction('editing Distribution', () => {
        this.distributionRegistry.set(distribution.id, distribution);
        this.distribution = distribution;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit Distribution error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };
  

  @action deleteDistribution = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Distributions.delete(id);
      runInAction('deleting Distribution', () => {
        this.distributionRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete Distribution error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}