import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IBranch } from '../models/branch';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class BranchStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }

  @observable branchRegistry = new Map();
  @observable branch: IBranch | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get branchesByDate() {
    return Array.from(this.branchRegistry.values()) 
  }

  @action loadBranches = async () => {
    this.loadingInitial = true;
    try {
      const branches = await agent.Branches.list();
      runInAction('loading branches', () => {
        branches.forEach(branch => {
          this.branchRegistry.set(branch.id, branch);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load branches error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadBranch = async (id: string) => {
    let branch = this.getBranch(id);
    if (branch){
      this.branch = branch;
      return branch;
    } else {
      this.loadingInitial = true;
      try {
        branch = await agent.Branches.details(id);
        runInAction('getting branch',() => {
          this.branch = branch;
          this.loadingInitial = false;
        })
        return branch;
      }catch (error) {
        runInAction('get branch error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearBranch = () => {
    this.branch = null;
  }

  getBranch = (id: string) => {
    return this.branchRegistry.get(id);
  }

  @action createBranch = async (branch: IBranch) => {
    this.submitting = true;
    try {
      await agent.Branches.create(branch);
      runInAction('create branch', () => {
        this.branchRegistry.set(branch.id, branch);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create branch error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editBranch = async (branch: IBranch) => {
    this.submitting = true;
    try {
      await agent.Branches.update(branch);
      runInAction('editing branch', () => {
        this.branchRegistry.set(branch.id, branch);
        this.branch = branch;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit branch error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteBranch = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Branches.delete(id);
      runInAction('deleting branch', () => {
        this.branchRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete branch error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}