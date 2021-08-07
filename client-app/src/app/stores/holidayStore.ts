import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IHoliday } from '../models/holiday';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class HolidayStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable holidayRegistry = new Map();
  @observable holiday: IHoliday | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get holidaysByDate() {
    return Array.from(this.holidayRegistry.values()) 
  }

  @action loadHolidays = async () => {
    this.loadingInitial = true;
    try {
      const holidays = await agent.Holidays.list();
      runInAction('loading activities', () => {
        holidays.forEach(holiday => {
          this.holidayRegistry.set(holiday.id, holiday);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load holiday error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadHoliday = async (id: string) => {
    let holiday = this.getHoliday(id);
    if (holiday){
      this.holiday = holiday;
    } else {
      this.loadingInitial = true;
      try {
        holiday = await agent.Holidays.details(id);
        runInAction('getting holiday',() => {
          this.holiday = holiday;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get holiday error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearHoliday = () => {
    this.holiday = null;
  }

  getHoliday = (id: string) => {
    return this.holidayRegistry.get(id);
  }

  @action createHoliday = async (holiday: IHoliday) => {
    this.submitting = true;
    try {
      await agent.Holidays.create(holiday);
      runInAction('create holiday', () => {
        this.holidayRegistry.set(holiday.id, holiday);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create holiday error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editHoliday = async (holiday: IHoliday) => {
    this.submitting = true;
    try {
      await agent.Holidays.update(holiday);
      runInAction('editing holiday', () => {
        this.holidayRegistry.set(holiday.id, holiday);
        this.holiday = holiday;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit holiday error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteHoliday = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Holidays.delete(id);
      runInAction('deleting holiday', () => {
        this.holidayRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete holiday error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

