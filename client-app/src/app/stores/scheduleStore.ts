import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ISchedule } from '../models/schedule';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ScheduleStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable scheduleRegistry = new Map();
  @observable schedule: ISchedule | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get schedulesByDate() {
    return Array.from(this.scheduleRegistry.values()) 
  }

  @action loadSchedules = async () => {
    this.loadingInitial = true;
    try {
      const schedules = await agent.Schedules.list();
      runInAction('loading activities', () => {
        schedules.forEach(schedule => {
          this.scheduleRegistry.set(schedule.id, schedule);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load schedule error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadSchedule = async (id: string) => {
    let schedule = this.getSchedule(id);
    if (schedule){
      this.schedule = schedule;
    } else {
      this.loadingInitial = true;
      try {
        schedule = await agent.Schedules.details(id);
        runInAction('getting schedule',() => {
          this.schedule = schedule;
          this.loadingInitial = false;
        })
      }catch (error) {
        runInAction('get schedule error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearSchedule = () => {
    this.schedule = null;
  }

  getSchedule = (id: string) => {
    return this.scheduleRegistry.get(id);
  }

  @action createSchedule = async (schedule: ISchedule) => {
    this.submitting = true;
    try {
      await agent.Schedules.create(schedule);
      runInAction('create schedule', () => {
        this.scheduleRegistry.set(schedule.id, schedule);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create schedule error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editSchedule = async (schedule: ISchedule) => {
    this.submitting = true;
    try {
      await agent.Schedules.update(schedule);
      runInAction('editing schedule', () => {
        this.scheduleRegistry.set(schedule.id, schedule);
        this.schedule = schedule;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit schedule error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteSchedule = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Schedules.delete(id);
      runInAction('deleting schedule', () => {
        this.scheduleRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete schedule error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}


