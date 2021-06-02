import { post, get } from '@services/fetcher';
import { IUser } from '@containers/auth/type';

interface ILogin {
    email: string,
    password: string,
}

const apiUser = {
    login(payload: ILogin): Promise<IUser> {
        const user: IUser = { email: payload.email, accessToken: 'token' };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user);
            }, 2000);
        })
    },
    getProfile(): Promise<IUser> {
        const user: IUser = { email: 'user@mail.vn', accessToken: 'token' };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user);
            }, 2000);
        })
    },
};

export default apiUser;
