import { AxiosInstance } from 'axios';

export interface ApiAdapter {
    get<T>(url: string): Promise<T>;
    post<T, U>(url: string, data: T): Promise<U>;
    put<T, U>(url: string, data: T): Promise<U>;
    delete<T>(url: string): Promise<T>;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface CreateApiMethodParams<T,_U> {
    client: AxiosInstance;
    method: HttpMethod;
    url: string;
    data?: T;
}

