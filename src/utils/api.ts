import { RefreshToken } from "../types/UserItem";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../components/customs/toast/ToastHook";
import {PRODUCTION_ENVIRONMENT, DEVELOPMENT_API_URL, PRODUCTION_API_URL} from "./environments/environment";
import { useDispatch } from "react-redux";
import { removeUser } from "../slicers/user";
export let host: string;
if(PRODUCTION_ENVIRONMENT){
      host = PRODUCTION_API_URL
  }else{
      host = DEVELOPMENT_API_URL
  }
export const commonURL = `${host}/commons/`;
export const appURL = `${host}/applications/`;
export const fileUrl = `${host}/media/`
export const tokenKey = `${appURL}.token.authorizationData`;
export const refreshKey = `${appURL}.refresh.authorizationData`;


export const refresh_token = () => {
  const refresh = localStorage.getItem(refreshKey);
  return axios.post<RefreshToken>(`${commonURL}authorize/token/refresh/`, {
    refresh,
  });
}

export const requestConfig = (api: AxiosInstance, config: InternalAxiosRequestConfig) => {
  if (config.url?.endsWith("/null")) {
    return config;
  }
  if (getToken()) {
    config.headers!.Authorization = `Bearer ${getToken()}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
  return config;
}

export  const getToken = () => {
  return localStorage.getItem(tokenKey);
}

export const handleError = (error: any, form: any) => {

  const errors = error.response.data.error?.details;
  for (const err in errors) {
    if (err === 'non_field_errors') {
      form.setError('root', { message: errors[err] })
    } else {
      form.setError(err, { message: errors[err] })
    }
  }
}


export const useRefreshToken =()=> {
  const dispatch = useDispatch();
  // let token = localStorage.getItem(tokenKey);
  let { id } = useParams();
  const exclude = ["/", `/course_detail/${id}`, `/tutors/${id}`]
  const addRefreshToken =  async (error: AxiosError, cb: Function, navigate? : Function)  => {
    const config = error.config;
    try {
      let res = await refresh_token();
    if (res.data.access) {
      localStorage.setItem(tokenKey, res.data.access);
      localStorage.setItem(refreshKey, res.data.refresh);
      config!.headers!.Authorization = `Bearer ${res.data.access}`
      // token = res.data.access
    }
    return cb(config);
  } catch (err) {
    const errors = err as Error | AxiosError;

    if (axios.isAxiosError(errors)) {
      const status = errors.response?.status
      if (status === 400 || status === 401) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshKey);
        dispatch(removeUser());
        if(!exclude.includes(window.location.pathname, 0)){
          // logout()
          navigate?.('/login');
        }
      }
    }
    return Promise.reject(err);
  }
}
return { addRefreshToken }
}


const useApi = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const refreshToken = useRefreshToken()

  const useAppApi = () => {
    const api = axios.create({
      baseURL: appURL,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    api.interceptors.request.use((config: InternalAxiosRequestConfig) => requestConfig(api, config), error => Promise.reject(error))
    api.interceptors.response.use((response) => response, (error) => handleResponseError(error, api))
    return api
  }
  const useFileApi = () => {
    const api = axios.create({
      baseURL: fileUrl,
      headers: {
        'content-type': 'multipart/form-data'
      },
    })

    api.interceptors.request.use((config: InternalAxiosRequestConfig) => requestConfig(api, config), error => Promise.reject(error))
    api.interceptors.response.use((response) => response, (error) => handleResponseError(error, api))
    return api
  }
  const useCommonApi = () => {

    const api = axios.create({
      baseURL: commonURL,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    api.interceptors.request.use((config: any) => requestConfig(api, config), error => Promise.reject(error))
    api.interceptors.response.use((response) => response, (error) => handleResponseError(error, api))
    return api
  }



  const handleResponseError = (error: AxiosError, cb: Function) => {
    const status = error.response?.status
    let data: any = error.response?.data
    const errors = data.error?.details;
    switch (status) {
      case 400:
        (errors instanceof Array) && toast.alert(errors[0], 5)
        // for (const err in errors){
        //   err === 'non_field_errors' ?
        //     toast.alert(errors[err], 5) :
        //     toast.alert((err.length > 1 ? err + ': ' : '' ) + errors[err], 5)
        // }
        break;
      case 401:
        return refreshToken.addRefreshToken(error, cb, navigate);
      case 403:
        toast.alert('access denied')
        break;
      case 404:
        toast.warning("Resource Not found" + error.response?.config?.url);
        break;
      case 503:
        toast.alert("Unable to contact remote server. Make sure your connection is working and try again");
        break;
      default:
        //handle remaining 4xx or 5xx responses
        toast.warning(error.message)
        break;
    }
    return Promise.reject(error)
  }

  const commonApi = useCommonApi()
  const appApi = useAppApi()
  const fileApi = useFileApi()
  return { appApi, commonApi , fileApi}

}

export default useApi
