import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const mockAxios = jest.createMockFromModule<typeof axios>('axios');

mockAxios.create = jest.fn(() => mockAxios);

mockAxios.get = jest.fn().mockImplementation(<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return Promise.resolve({ data: {} as T } as AxiosResponse<T>);
});

mockAxios.post = jest.fn().mockImplementation(<T = any, U = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<U>> => {
    return Promise.resolve({ data: {} as U } as AxiosResponse<U>);
});

mockAxios.put = jest.fn().mockImplementation(<T = any, U = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<U>> => {
    return Promise.resolve({ data: {} as U } as AxiosResponse<U>);
});

mockAxios.delete = jest.fn().mockImplementation(<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => { 
    return Promise.resolve({ data: {} as T } as AxiosResponse<T>);
});

mockAxios.request = jest.fn().mockImplementation((config: AxiosRequestConfig): Promise<any> => {
    return Promise.resolve({ data: {} } as any);
});

export default mockAxios;
