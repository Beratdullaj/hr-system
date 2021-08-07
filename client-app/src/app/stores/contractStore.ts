import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IContract } from '../models/contract';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ContractStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable contractRegistry = new Map();
  @observable contract: IContract | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get contractsByDate() {
    return Array.from(this.contractRegistry.values()) 
  }

  @action loadContracts = async () => {
    this.loadingInitial = true;
    try {
      const contracts = await agent.Contracts.list();
      runInAction('loading contracts', () => {
        contracts.forEach(contract => {
          this.contractRegistry.set(contract.id, contract);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load contracts error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadContract = async (id: string) => {
    let contract = this.getContract(id);
    if (contract){
      this.contract = contract;
      return contract;
    } else {
      this.loadingInitial = true;
      try {
        contract = await agent.Contracts.details(id);
        runInAction('getting contract',() => {
          this.contract = contract;
          this.loadingInitial = false;
        })
        return contract;
      }catch (error) {
        runInAction('get contract error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearContract = () => {
    this.contract = null;
  }

  getContract = (id: string) => {
    return this.contractRegistry.get(id);
  }

  @action createContract = async (contract: IContract) => {
    this.submitting = true;
    try {
      await agent.Contracts.create(contract);
      runInAction('create contract', () => {
        this.contractRegistry.set(contract.id, contract);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create contract error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editContract = async (contract: IContract) => {
    this.submitting = true;
    try {
      await agent.Contracts.update(contract);
      runInAction('editing contract', () => {
        this.contractRegistry.set(contract.id, contract);
        this.contract = contract;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit contract error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteContract = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Contracts.delete(id);
      runInAction('deleting contract', () => {
        this.contractRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete contract error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}