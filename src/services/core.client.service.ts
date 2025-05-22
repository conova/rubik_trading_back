import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import config from '../../config/config';
import { CoreRequestCode } from '../utils/apiCode'

const coreClient: AxiosInstance = axios.create({
    baseURL: config.CORE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'API-KEY': config.CORE_API_KEY,
    },
});

// Response structure
export type CoreRequest<T> = {
    code: CoreRequestCode;
    data: T;
};

export interface CoreErrorResponse {
    code: string;
    data: any;
    errorCode: string;
    message: string;
}

export type CoreResponse<T> = T | CoreErrorResponse;

// Request logging
coreClient.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        console.log(`[CORE REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: any) => Promise.reject(error)
);

// Response logging
coreClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        console.log(`[CORE RESPONSE] ${response.status} ${response.config.url}`);
        return response;
    },
    (error: AxiosError) => {
        console.error(`[CORE ERROR]`, error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Core POST function
const corePost = async <T = any>(data: any): Promise<T> => {
    const response = await coreClient.post<T>(config.CORE_API_PATH, data);
    return response.data;
};

// Type-safe fetch function
export const fetch = async <T = any>(code: CoreRequestCode, data: any): Promise<CoreResponse<T>> => {
    const payload: CoreRequest<any> = {
        code,
        data,
    };
    return await corePost(payload);
}

const requests: { [key: string]: any } = {};

for (const key in CoreRequestCode) {
    requests[key] = async function(data: any) {
        return await fetch(CoreRequestCode[key as keyof typeof CoreRequestCode], data)
    }
}

 export const coreFetch = requests;