import { observable, action, computed,  runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IDepartment } from '../models/department';
import agent from '../api/agent';
import { RootStore } from './rootStore';


export default class DepartmentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }


  @observable departmentRegistry = new Map();
  @observable department: IDepartment | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get departmentsByDate() {
    return Array.from(this.departmentRegistry.values()) 
  }

  @action loadDepartments = async () => {
    this.loadingInitial = true;
    try {
      const departments = await agent.Departments.list();
      runInAction('loading activities', () => {
        departments.forEach(department => {
          this.departmentRegistry.set(department.id, department);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadDepartment = async (id: string) => {
    let department = this.getDepartment(id);
    if (department){
      this.department = department;
      return department;
    } else {
      this.loadingInitial = true;
      try {
        department = await agent.Departments.details(id);
        runInAction('getting department',() => {
          this.department = department;
          this.loadingInitial = false;
        })
        return department;
      }catch (error) {
        runInAction('get department error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearDepartment = () => {
    this.department = null;
  }

  getDepartment = (id: string) => {
    return this.departmentRegistry.get(id);
  }

  @action createDepartment = async (department: IDepartment) => {
    this.submitting = true;
    try {
      await agent.Departments.create(department);
      runInAction('create activity', () => {
        this.departmentRegistry.set(department.id, department);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editDepartment = async (department: IDepartment) => {
    this.submitting = true;
    try {
      await agent.Departments.update(department);
      runInAction('editing activity', () => {
        this.departmentRegistry.set(department.id, department);
        this.department = department;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteDepartment = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Departments.delete(id);
      runInAction('deleting activity', () => {
        this.departmentRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete activity error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}