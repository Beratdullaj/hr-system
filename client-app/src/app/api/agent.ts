import axios, { AxiosResponse } from 'axios';
import { IDepartment } from '../models/department';
import { IPermission } from '../models/permission';
import { IProduct } from '../models/product';
import { IStockRequest } from '../models/stockrequest';
import { IProject } from '../models/project';
import { IDistribution } from '../models/distribution';
import { ITeam } from '../models/team';
import { IBranch } from '../models/branch';
import { IContract } from '../models/contract';
import { IVehicle } from '../models/vehicle';
import { IService } from '../models/service';
import { IAboutUs } from '../models/aboutus';
import { IMemo } from '../models/memo';
import { IFeedback } from '../models/feedback';
import { ITraining } from '../models/training';
import { ISchedule } from '../models/schedule';
import { IHoliday } from '../models/holiday';
import { INew } from '../models/_new';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if(error.message === 'Network Error' && !error.response){
        toast.error('Network error - make sure API is running!')
    }
    const {status,data,config} = error.response;
    if (status === 404) {
        history.push('/notfound')
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
    {
        history.push('/notfound');
    }
    if(status === 500){
        toast.error('Server error - check the terminal for more info!')
    }
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody) 
};

const Departments = {
    list: (): Promise<IDepartment[]> => requests.get('/departments'),
    details: (id: string) => requests.get(`/departments/${id}`),
    create: (department: IDepartment) => requests.post('/departments', department),
    update: (department: IDepartment) => requests.put(`/departments/${department.id}`, department),
    delete: (id: string) => requests.del(`/departments/${id}`)
}

const Products = {
    list: (): Promise<IProduct[]> => requests.get('/products'),
    details: (id: string) => requests.get(`/products/${id}`),
    create: (department: IProduct) => requests.post('/products', department),
    update: (department: IProduct) => requests.put(`/products/${department.id}`, department),
    delete: (id: string) => requests.del(`/products/${id}`)
}

const Permissions = {
    list: (): Promise<IPermission[]> => requests.get('/permissions'),
    details: (id: string) => requests.get(`/permissions/${id}`),
    create: (permission: IPermission) => requests.post('/permissions', permission),
    update: (permission: IPermission) => requests.put(`/permissions/${permission.id}`, permission),
    delete: (id: string) => requests.del(`/permissions/${id}`)
}

const Teams = {
    list: (): Promise<ITeam[]> => requests.get('/teams'),
    details: (id: string) => requests.get(`/teams/${id}`),
    create: (team: ITeam) => requests.post('/teams', team),
    update: (team: ITeam) => requests.put(`/teams/${team.id}`, team),
    delete: (id: string) => requests.del(`/teams/${id}`)
}

const Branches = {
    list: (): Promise<IBranch[]> => requests.get('/branches'),
    details: (id: string) => requests.get(`/branches/${id}`),
    create: (branch: IBranch) => requests.post('/branches', branch),
    update: (branch: IBranch) => requests.put(`/branches/${branch.id}`, branch),
    delete: (id: string) => requests.del(`/branches/${id}`)
}

const Contracts = {
    list: (): Promise<IContract[]> => requests.get('/contracts'),
    details: (id: string) => requests.get(`/contracts/${id}`),
    create: (contract: IContract) => requests.post('/contracts', contract),
    update: (contract: IContract) => requests.put(`/contracts/${contract.id}`, contract),
    delete: (id: string) => requests.del(`/contracts/${id}`)
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
}

const Vehicles = {
    list: (): Promise<IVehicle[]> => requests.get('/vehicles'),
    details: (id: string) => requests.get(`/vehicles/${id}`),
    create: (vehicle: IVehicle) => requests.post('/vehicles', vehicle),
    update: (vehicle: IVehicle) => requests.put(`/vehicles/${vehicle.id}`, vehicle),
    delete: (id: string) => requests.del(`/vehicles/${id}`)
}

const Services = {
    list: (): Promise<IService[]> => requests.get('/services'),
    details: (id: string) => requests.get(`/services/${id}`),
    create: (service: IService) => requests.post('/services', service),
    update: (service: IService) => requests.put(`/services/${service.id}`, service),
    delete: (id: string) => requests.del(`/services/${id}`)
}

const About_Us = {
    list: (): Promise<IAboutUs[]> => requests.get('/aboutus'),
    details: (id: string) => requests.get(`/aboutus/${id}`),
    create: (aboutus: IAboutUs) => requests.post('/aboutus', aboutus),
    update: (aboutus: IAboutUs) => requests.put(`/aboutus/${aboutus.id}`, aboutus),
    delete: (id: string) => requests.del(`/aboutus/${id}`)
}

const Memos = {
    list: (): Promise<IMemo[]> => requests.get('/Memos'),
    details: (id: string) => requests.get(`/memos/${id}`),
    create: (memo: IMemo) => requests.post('/memos', memo),
    update: (memo: IMemo) => requests.put(`/memos/${memo.id}`, memo),
    delete: (id: string) => requests.del(`/memos/${id}`)
}

const Feedbacks = {
    list: (): Promise<IFeedback[]> => requests.get('/Feedbacks'),
    details: (id: string) => requests.get(`/feedbacks/${id}`),
    create: (feedback: IFeedback) => requests.post('/feedbacks', feedback),
    update: (feedback: IFeedback) => requests.put(`/feedbacks/${feedback.id}`, feedback),
    delete: (id: string) => requests.del(`/feedbacks/${id}`)
}

const Trainings = {
    list: (): Promise<ITraining[]> => requests.get('/Trainings'),
    details: (id: string) => requests.get(`/trainings/${id}`),
    create: (training: ITraining) => requests.post('/trainings', training),
    update: (training: ITraining) => requests.put(`/trainings/${training.id}`, training),
    delete: (id: string) => requests.del(`/trainings/${id}`)
}

const Schedules = {
    list: (): Promise<ISchedule[]> => requests.get('/schedules'),
    details: (id: string) => requests.get(`/schedules/${id}`),
    create: (schedule: ISchedule) => requests.post('/schedules', schedule),
    update: (schedule: ISchedule) => requests.put(`/schedules/${schedule.id}`, schedule),
    delete: (id: string) => requests.del(`/schedules/${id}`)
}

const Holidays = {
    list: (): Promise<IHoliday[]> => requests.get('/holidays'),
    details: (id: string) => requests.get(`/holidays/${id}`),
    create: (holiday: IHoliday) => requests.post('/holidays', holiday),
    update: (holiday: IHoliday) => requests.put(`/holidays/${holiday.id}`, holiday),
    delete: (id: string) => requests.del(`/holidays/${id}`)
}

const News = {
    list: (): Promise<INew[]> => requests.get('/news'),
    details: (id: string) => requests.get(`/news/${id}`),
    create: (news: INew) => requests.post('/news', news),
    update: (news: INew) => requests.put(`/news/${news.id}`, news),
    delete: (id: string) => requests.del(`/news/${id}`)
}
const StockRequests = {
    list: (): Promise<IStockRequest[]> => requests.get('/stockrequests'),
    details: (id: string) => requests.get(`/stockrequests/${id}`),
    create: (stockrequest: IStockRequest) => requests.post('/stockrequests', stockrequest),
    update: (stockrequest: IStockRequest) => requests.put(`/stockrequests/${stockrequest.id}`, stockrequest),
    delete: (id: string) => requests.del(`/stockrequests/${id}`)
}
const Projects = {
    list: (): Promise<IProject[]> => requests.get('/projects'),
    details: (id: string) => requests.get(`/projects/${id}`),
    create: (project: IProject) => requests.post('/projects', project),
    update: (project: IProject) => requests.put(`/projects/${project.id}`, project),
    delete: (id: string) => requests.del(`/projects/${id}`)
}
const Distributions = {
    list: (): Promise<IDistribution[]> => requests.get('/distributions'),
    details: (id: string) => requests.get(`/distributions/${id}`),
    create: (distribution: IDistribution) => requests.post('/distributions', distribution),
    update: (distribution: IDistribution) => requests.put(`/distributions/${distribution.id}`, distribution),
    delete: (id: string) => requests.del(`/distributions/${id}`)
}

export default {
    Departments,
    Products, 
    Permissions, 
    Teams, 
    Branches, 
    Contracts,
    User,
    Vehicles, 
    Services, 
    About_Us, 
    Memos, 
    Feedbacks, 
    Trainings, 
    Schedules, 
    Holidays, 
    News,
    StockRequests,
    Projects,
    Distributions
}