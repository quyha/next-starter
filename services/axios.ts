import axios from 'axios';

const cancelToken = axios.CancelToken;

// eslint-disable-next-line import/no-mutable-exports
export let cancelSource = cancelToken.source();

export const instance = axios.create({
    // baseURL: process.env.API_ENDPOINT,
    baseURL: 'https://api.pinme.vn/v2/publisher',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const refreshCancelSource = (): void => {
    cancelSource = cancelToken.source();
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isCancelRequest = (err: any): boolean => axios.isCancel(err);

export const setAuthorization = (h: string | null): void => {
    instance.defaults.headers.common.Authorization = h;
};
