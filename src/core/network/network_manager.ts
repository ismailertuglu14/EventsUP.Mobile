import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cache_manager from '../cache/cache_manager';
import CacheManager from '../cache/cache_manager';
import CacheEnum from '../cache/cache_enums';
import { BASE_NETWORK_TIMEOUT } from './network_constants';




const axiosInstance = axios.create({
            baseURL: 'http://10.0.2.2:3000/api',
            timeout: BASE_NETWORK_TIMEOUT
        });

        axiosInstance.interceptors.request.use(async (config) => {
            const token = await CacheManager.getInstance().get(CacheEnum.TOKEN)
            if (token) {
                console.log("token: ",token)
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    



export default axiosInstance;
