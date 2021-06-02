/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, AxiosError } from 'axios';
import Router from 'next/router';
import { getParamsSearchDefault, isArray } from '@utils/collections';
import { instance } from './axios';
import { isClientSide } from '@utils/request';
import { logoutUser } from './user';
import { RouteNames } from '@constants/route-names';

type Obj = { [key: string]: any };

interface ResponseData<T = any> {
    statusCode: string;
    data?: T;
    message?: string;
}

export interface ResponseDataList<T = any> {
    total: number;
    items: T[];
}

instance.interceptors.response.use((response: AxiosResponse<ResponseData>) => {
    const { status, data } = response;

    if (status === 200) {
        if (data.statusCode === 'OK') {
            return data.data;
        }

        if (data.statusCode === '401') {
            if (isClientSide()) {
                logoutUser();
                Router.push(RouteNames.LOGIN);
                return Promise.reject(data.message);
            }
            return Promise.reject(data);
        }

        return Promise.reject(data.message);
    }
    
    return Promise.reject(new Error('Unknown error'));
}, (error: AxiosError) => {
    // if (error.response?.status === 401) {
    //     const user = serviceUser.get();

    //     serviceUser.set(null);
    //     history.push(routeNames.login, { referer: history.location });
    //     return false;
    // }
    return Promise.reject(error);
});

function get<T, R = AxiosResponse<T>>(route: string, params?: Obj): Promise<R> {
    const paramsSearch = getParamsSearchDefault(params);
    return instance.get(route, { params: paramsSearch });
}

function post<T, R = AxiosResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.post(route, payload);
}

function put<T, R = AxiosResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.put(route, payload);
}

function del<T, R = AxiosResponse<T>>(route: string): Promise<R> {
    return instance.delete(route);
}

function upload<T, R = AxiosResponse<T>>(route: string, payload: Obj): Promise<R> {
    const formData = new FormData();

    function appendFormData(nameInput: string, array: Array<any>): void {
        for (let i = 0; i < array.length; i += 1) {
            formData.append(nameInput, array[i]);
        }
    }

    const keysData = Object.keys(payload);

    if (keysData.length > 0) {
        for (let i = 0; i < keysData.length; i += 1) {
            const keyItem = keysData[i];
            if (isArray(payload[keyItem])) {
                appendFormData(keyItem, payload[keyItem]);
            } else {
                formData.append(keyItem, payload[keyItem]);
            }
        }
    }

    return instance.post(route, formData);
}

export {
    get,
    post,
    put,
    del,
    upload,
}
