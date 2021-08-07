import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { ITeam } from '../models/team';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class TeamStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }



  @observable teamRegistry = new Map();
  @observable team: ITeam | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get teamsByDate() {
    return Array.from(this.teamRegistry.values()) 
  }

  @action loadTeams = async () => {
    this.loadingInitial = true;
    try {
      const teams = await agent.Teams.list();
      runInAction('loading teams', () => {
        teams.forEach(team => {
          this.teamRegistry.set(team.id, team);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load teams error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadTeam = async (id: string) => {
    let team = this.getTeam(id);
    if (team){
      this.team = team;
      return team;
    } else {
      this.loadingInitial = true;
      try {
        team = await agent.Teams.details(id);
        runInAction('getting team',() => {
          this.team = team;
          this.loadingInitial = false;
        })
        return team;
      }catch (error) {
        runInAction('get team error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearTeam = () => {
    this.team = null;
  }

  getTeam = (id: string) => {
    return this.teamRegistry.get(id);
  }

  @action createTeam = async (team: ITeam) => {
    this.submitting = true;
    try {
      await agent.Teams.create(team);
      runInAction('create team', () => {
        this.teamRegistry.set(team.id, team);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create team error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editTeam = async (team: ITeam) => {
    this.submitting = true;
    try {
      await agent.Teams.update(team);
      runInAction('editing team', () => {
        this.teamRegistry.set(team.id, team);
        this.team = team;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit team error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteTeam = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Teams.delete(id);
      runInAction('deleting team', () => {
        this.teamRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete team error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}