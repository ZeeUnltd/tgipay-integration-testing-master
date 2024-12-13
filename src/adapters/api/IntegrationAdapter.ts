import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import apiConfig from '@/config/api';
import { ApiAdapter, HttpMethod } from '@/types/api';

interface CreateApiMethodParams<T, U> {
    client: AxiosInstance;
    method: HttpMethod;
    url: string;
    data?: T;
}

export async function createApiMethod<T, U>({ client, method, url, data }: CreateApiMethodParams<T, U>): Promise<U> {
    const response = await client.request<U>({
        method,
        url,
        data,
    });
    return response.data;
}


export const createAxiosApiAdapter = (): ApiAdapter => {
    const client: AxiosInstance = axios.create({
        baseURL: apiConfig.INTEGRATION_SERVICE_ENDPOINT,
    });

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            config.headers['integration-key'] = apiConfig.API_KEY;
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    return {
        get: async <T>(url: string) => createApiMethod<void, T>({ client, method: 'get', url }),
        post: async <T, U>(url: string, data: T) => createApiMethod<T, U>({ client, method: 'post', url, data }),
        put: async <T, U>(url: string, data: T) => createApiMethod<T, U>({ client, method: 'put', url, data }),
        delete: async <T>(url: string) => createApiMethod<void, T>({ client, method: 'delete', url }),
    };
};
