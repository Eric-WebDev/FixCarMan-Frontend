import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";
import { IAdvert, IAdvertsEnvelope } from "../models/advertsFixCar/adverts";
import { IUser, IUserFormValues } from "../models/users/user";
import {
  IProfile,
  IVehicle,
  IVehicleFormValues,
} from "../models/profiles/profile";
let history = createBrowserHistory();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Adverts = {
  list: (predicateurl: string): Promise<IAdvertsEnvelope> =>
    requests.get(`/adverts?predicate=${predicateurl}`),
  details: (id: string) => requests.get(`/adverts/${id}`),
  create: (advert: IAdvert) => requests.post("/adverts", advert),
  update: (advert: IAdvert) => requests.put(`/adverts/${advert.id}`, advert),
  delete: (id: string) => requests.del(`/adverts/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  updateProfile: (profile: Partial<IProfile>) =>
    requests.put(`/profiles`, profile),
  create: (profile: Partial<IProfile>) => requests.post(`/profiles`, profile),
  listAdverts: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/adverts?predicate=${predicate}`),
  // uploadPhoto: (photo: Blob): Promise<IPhoto> =>
  //   requests.postForm(`/photos`, photo),
  // deletePhoto: (id: string) => requests.del(`/photos/${id}`)
};

const Vehicles = {
  getVehicle: (id: string, predicate: string) =>
    requests.get(`/vehicles/${id}/?predicate=${predicate}`),
  create: (vehicle: IVehicleFormValues) => requests.post("/vehicles", vehicle),
  update: (vehicle: IVehicleFormValues) =>
    requests.put(`/vehicles/${vehicle.id}`, vehicle),
  delete: (vehicle: IVehicle) => requests.del(`/vehicles/${vehicle.id}`),
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Adverts,
  User,
  Profiles,
  Vehicles
};
