import { configure } from 'mobx'
import { createContext } from 'react'
import BranchStore from './branchStore'
import CommonStore from './commonStore'
import ContractStore from './contractStore'
import DepartmentStore from './departmentStore'
import ModalStore from './modalStore'
import PermissionStore from './permissionStore'
import ProductStore from './productStore'
import TeamStore from './teamStore'
import VehicleStore from './vehicleStore'
import ServiceStore from './serviceStore'
import AboutUsStore from './aboutusStore'
import StockRequestStore from './stockrequestStore'
import ProjectStore from './projectStore'
import DistributionStore from './distributionStore'
import ScheduleStore from './scheduleStore'
import HolidayStore from './holidayStore'
import NewStore from './_newStore'

import MemoStore from './memoStore'
import TrainingStore from './trainingStore'
import FeedbackStore from './feedbackStore'

import UserStore from './userStore'

configure({enforceActions: 'always'});

export class RootStore {
    branchStore: BranchStore;
    contractStore: ContractStore;
    userStore: UserStore;
    departmentStore: DepartmentStore;
    permissionStore: PermissionStore;
    productStore: ProductStore;
    teamStore: TeamStore;
    vehicleStore: VehicleStore;
    serviceStore: ServiceStore;
    aboutusStore: AboutUsStore;
    stockrequestStore: StockRequestStore;
    projectStore: ProjectStore;
    distributionStore: DistributionStore;
    scheduleStore: ScheduleStore;
    holidayStore: HolidayStore;
    _newStore: NewStore;

    memoStore: MemoStore;
    trainingStore: TrainingStore;
    feedbackStore: FeedbackStore;

    
    commonStore: CommonStore;
    modalStore: ModalStore


    constructor() {
        this.branchStore = new BranchStore(this);
        this.contractStore = new ContractStore(this);
        this.departmentStore = new DepartmentStore(this);
        this.userStore = new UserStore(this);
        this.permissionStore = new PermissionStore(this);
        this.productStore = new ProductStore(this);
        this.teamStore = new TeamStore(this);
        this.vehicleStore = new VehicleStore(this);
        this.serviceStore = new ServiceStore(this);
        this.aboutusStore = new AboutUsStore(this);
        this.stockrequestStore = new StockRequestStore(this);
        this.projectStore = new ProjectStore(this);
        this.distributionStore = new DistributionStore(this);
        this.scheduleStore = new ScheduleStore(this);
        this.holidayStore = new HolidayStore(this);
        this._newStore = new NewStore(this);

        
        this.memoStore = new MemoStore(this);
        this.trainingStore = new TrainingStore(this);
        this.feedbackStore = new FeedbackStore(this);

        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);

    }
}

export const RootStoreContext = createContext(new RootStore());