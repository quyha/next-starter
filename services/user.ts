import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { NextPageContext } from 'next';
import { IUser } from '@containers/auth/type';
import { setAuthorization } from './axios';

const STORAGE_USER_TOKEN_KEY = 'iu_tk';
const STORAGE_USER_INFO_KEY = 'iu_us';

function storeToken(token: string): void {
    setCookie(undefined, STORAGE_USER_TOKEN_KEY, token, { path: '/' });
}

function destroyTokenFromClient(): void {
    destroyCookie(undefined, STORAGE_USER_TOKEN_KEY, { path: '/' });
}

function destroyTokenFromServer(ctx: Pick<NextPageContext, 'res'>): void {
    destroyCookie(ctx, STORAGE_USER_TOKEN_KEY, { path: '/' });
}

function getTokenFromClient(): string {
    const cookies = parseCookies();
    return cookies[STORAGE_USER_TOKEN_KEY];
}

function getTokenFromServer(ctx: Pick<NextPageContext, 'req'>): string {
    const cookies = parseCookies(ctx);
    return cookies[STORAGE_USER_TOKEN_KEY];
}

function storeUser(user: Omit<IUser, 'accessToken'>): void {
    const value = JSON.stringify(user);
    setCookie(undefined, STORAGE_USER_INFO_KEY, value, { path: '/' });
}

function destroyUserFromClient(): void {
    destroyCookie(undefined, STORAGE_USER_INFO_KEY, { path: '/' });
}

function destroyUserFromServer(ctx: Pick<NextPageContext, 'res'>): void {
    destroyCookie(ctx, STORAGE_USER_INFO_KEY, { path: '/' });
}

function getUserFromStorage(fromServer = false, ctx?: Pick<NextPageContext, 'req'>): IUser | null {
    const cookies = (fromServer && ctx) ? parseCookies(ctx) : parseCookies();
    const userInfoStringify = cookies[STORAGE_USER_INFO_KEY];
    const accessToken = cookies[STORAGE_USER_TOKEN_KEY];
    
    if (!accessToken || !userInfoStringify) {
        return null;
    }
    
    const userInfo = JSON.parse(userInfoStringify);
    return { ...userInfo, accessToken };
}

function logoutUser(ctx?: Pick<NextPageContext, 'res'>): void {
    if (ctx) {
        destroyUserFromServer(ctx);
        destroyTokenFromServer(ctx);
    } else {
        destroyUserFromClient();
        destroyTokenFromClient();
    }
    setAuthorization(null);
};

export {
    storeToken,
    getTokenFromClient,
    getTokenFromServer,
    storeUser,
    getUserFromStorage,
    logoutUser,
};
