import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IStockRequest } from '../models/stockrequest';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class StockRequestStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }

  @observable stockrequestRegistry = new Map();
  @observable stockrequest: IStockRequest | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get stockrequestsByDate() {
    return Array.from(this.stockrequestRegistry.values()) 
  }


  @action loadStockRequests = async () => {
    this.loadingInitial = true;
    try {
      const stockrequests = await agent.StockRequests.list();
      runInAction('loading stockrequests', () => {
        stockrequests.forEach(stockrequest => {
          this.stockrequestRegistry.set(stockrequest.id, stockrequest);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load stockrequests error', () => {
        this.loadingInitial = false;
      })
    }
  };


  @action loadStockRequest = async (id: string) => {
    let stockrequest = this.getStockRequest(id);
    if (stockrequest){
      this.stockrequest = stockrequest;
      return stockrequest;
    } else {
      this.loadingInitial = true;
      try {
        stockrequest = await agent.StockRequests.details(id);
        runInAction('getting team',() => {
          this.stockrequest = stockrequest;
          this.loadingInitial = false;
        })
        return stockrequest;
      }catch (error) {
        runInAction('get stockrequest error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }


  @action clearStockRequest = () => {
    this.stockrequest = null;
  }

  getStockRequest = (id: string) => {
    return this.stockrequestRegistry.get(id);
  }


  @action createStockRequest = async (stockrequest: IStockRequest) => {
    this.submitting = true;
    try {
      await agent.StockRequests.create(stockrequest);
      runInAction('create stockrequest', () => {
        this.stockrequestRegistry.set(stockrequest.id, stockrequest);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create stockrequest error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };


  @action editStockRequest = async (stockrequest: IStockRequest) => {
    this.submitting = true;
    try {
      await agent.StockRequests.update(stockrequest);
      runInAction('editing stockrequest', () => {
        this.stockrequestRegistry.set(stockrequest.id, stockrequest);
        this.stockrequest = stockrequest;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit stockrequest error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };
  

  @action deleteStockRequest = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.StockRequests.delete(id);
      runInAction('deleting stockrequest', () => {
        this.stockrequestRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete stockrequest error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}