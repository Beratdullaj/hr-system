import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { INew } from '../models/_new';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class NewStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable _newRegistry = new Map();
  @observable _new: INew | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get newsByDate() {
    return Array.from(this._newRegistry.values()) 
  }

  @action loadNews = async () => {
    this.loadingInitial = true;
    try {
      const news = await agent.News.list();
      runInAction('loading news', () => {
        news.forEach(news => {
          this._newRegistry.set(news.id, news);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load news error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadNew = async (id: string) => {
    let news = this.getNew(id);
    if (news){
      this._new = news;
    } else {
      this.loadingInitial = true;
      try {
        news = await agent.News.details(id);
        runInAction('getting news',() => {
          this._new = news;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get news error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearNew = () => {
    this._new = null;
  }

  getNew = (id: string) => {
    return this._newRegistry.get(id);
  }

  @action createNew = async (news: INew) => {
    this.submitting = true;
    try {
      await agent.News.create(news);
      runInAction('create news', () => {
        this._newRegistry.set(news.id, news);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create news error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editNew = async (news: INew) => {
    this.submitting = true;
    try {
      await agent.News.update(news);
      runInAction('editing activity', () => {
        this._newRegistry.set(news.id, news);
        this._new = news;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit news error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action  deleteNew = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.News.delete(id);
      runInAction('deleting news', () => {
        this._newRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete news error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}


