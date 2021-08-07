import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import {IMemo} from '../models/memo';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class MemoStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable memoRegistry = new Map();
  @observable memo: IMemo | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get memosByDate() {
    return Array.from(this.memoRegistry.values()) 
  }

  @action loadMemos = async () => {
    this.loadingInitial = true;
    try {
      const memos = await agent.Memos.list();
      runInAction('loading memos', () => {
        memos.forEach(memo => {
          this.memoRegistry.set(memo.id, memo);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load memos error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadMemo = async (id: string) => {
    let memo = this.getMemo(id);
    if (memo){
      this.memo = memo;
    } else {
      this.loadingInitial = true;
      try {
        memo = await agent.Memos.details(id);
        runInAction('getting memo',() => {
          this.memo = memo;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get memo error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearMemo = () => {
    this.memo = null;
  }

  getMemo = (id: string) => {
    return this.memoRegistry.get(id);
  }

  @action createMemo = async (memo: IMemo) => {
    this.submitting = true;
    try {
      await agent.Memos.create(memo);
      runInAction('create memo', () => {
        this.memoRegistry.set(memo.id, memo);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create memo error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editMemo = async (memo: IMemo) => {
    this.submitting = true;
    try {
      await agent.Memos.update(memo);
      runInAction('editing memo', () => {
        this.memoRegistry.set(memo.id, memo);
        this.memo = memo;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit memo error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteMemo = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Memos.delete(id);
      runInAction('deleting memo', () => {
        this.memoRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete memo error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}


