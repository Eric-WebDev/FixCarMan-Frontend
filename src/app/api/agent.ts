import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import { IAdvert } from '../models/advertsFixCar/adverts';
import { IGarage } from '../models/vehicles/garage';
let history = createBrowserHistory();

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const {status, data, config} = error.response;
    if (status === 404) {
        history.push('/notfound')
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound')
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error;
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

const Adverts = {
    list: (): Promise<IAdvert[]> => requests.get('/adverts'),
    details: (id: string) => requests.get(`/adverts/${id}`),
    create: (advert: IAdvert) => requests.post('/adverts', advert),
    update: (advert: IAdvert) => requests.put(`/adverts/${advert.id}`, advert),
    delete: (id: string) => requests.del(`/adverts/${id}`)
}
const Garages = {
    list: (): Promise<IGarage[]> => requests.get('/garages'),
    details: (id: string) => requests.get(`/garages/${id}`),
    create: (garage: IGarage) => requests.post('/garages', garage),
    update: (garage: IGarage) => requests.put(`/garages/${garage.id}`, garage),
    delete: (id: string) => requests.del(`/garages/${id}`)
}
export default {
    Adverts,
    Garages
}