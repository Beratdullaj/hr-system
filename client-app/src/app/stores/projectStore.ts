import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IProject } from '../models/project';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ProjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }



  @observable projectRegistry = new Map();
  @observable project: IProject | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get projectsByDate() {
    return Array.from(this.projectRegistry.values()) 
  }

  @action loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const projects = await agent.Projects.list();
      runInAction('loading Projects', () => {
        projects.forEach(project => {
          this.projectRegistry.set(project.id, project);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load projects error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project){
      this.project = project;
      return project;
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.details(id);
        runInAction('getting project',() => {
          this.project = project;
          this.loadingInitial = false;
        })
        return project;
      }catch (error) {
        runInAction('get project error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearProject = () => {
    this.project = null;
  }

  getProject = (id: string) => {
    return this.projectRegistry.get(id);
  }

  @action createProject = async (project: IProject) => {
    this.submitting = true;
    try {
      await agent.Projects.create(project);
      runInAction('create project', () => {
        this.projectRegistry.set(project.id, project);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editProject = async (project: IProject) => {
    this.submitting = true;
    try {
      await agent.Projects.update(project);
      runInAction('editing project', () => {
        this.projectRegistry.set(project.id, project);
        this.project = project;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteProject = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Projects.delete(id);
      runInAction('deleting project', () => {
        this.projectRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete project error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}