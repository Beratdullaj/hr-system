import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IPermission } from '../models/permission';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class PermissionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }



  @observable permissionRegistry = new Map();
  @observable permission: IPermission | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get permissionsByDate() {
    return Array.from(this.permissionRegistry.values()) 
  }

  @action loadPermissions = async () => {
    this.loadingInitial = true;
    try {
      const permissions = await agent.Permissions.list();
      runInAction('loading permissions', () => {
        permissions.forEach(permission => {
          this.permissionRegistry.set(permission.id, permission);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load permissions error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadPermission = async (id: string) => {
    let permission = this.getPermission(id);
    if (permission){
      this.permission = permission;
      return permission;
    } else {
      this.loadingInitial = true;
      try {
        permission = await agent.Permissions.details(id);
        runInAction('getting permission',() => {
          this.permission = permission;
          this.loadingInitial = false;
        })
        return permission;
      }catch (error) {
        runInAction('get permission error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearPermission = () => {
    this.permission = null;
  }

  getPermission = (id: string) => {
    return this.permissionRegistry.get(id);
  }

  @action createPermission = async (permission: IPermission) => {
    this.submitting = true;
    try {
      await agent.Permissions.create(permission);
      runInAction('create permission', () => {
        this.permissionRegistry.set(permission.id, permission);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create permission error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editPermission = async (permission: IPermission) => {
    this.submitting = true;
    try {
      await agent.Permissions.update(permission);
      runInAction('editing permission', () => {
        this.permissionRegistry.set(permission.id, permission);
        this.permission = permission;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit permission error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deletePermission = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Permissions.delete(id);
      runInAction('deleting permission', () => {
        this.permissionRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete permission error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}