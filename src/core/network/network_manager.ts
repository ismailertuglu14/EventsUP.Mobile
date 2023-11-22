import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cache_manager from '../cache/cache_manager';
import CacheManager from '../cache/cache_manager';
import CacheEnum from '../cache/cache_enums';

const axiosInstance =  axios.create({
            baseURL: 'http://10.0.2.2:3000/api',
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
